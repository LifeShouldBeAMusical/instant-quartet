from sqlalchemy import and_, delete, select
from sqlalchemy.exc import NoResultFound

from data.data_connection import get_async_session
from model.database import ContributorModel, ContributorAssociation, SongModel
from model.enum import SuccessFailure
from model.strawberry import PartialSongInfo


async def update_song_info(song_id: int, song_input: PartialSongInfo) -> SuccessFailure:
    async with get_async_session() as session:
        try:
            song = (
                await session.scalars(select(SongModel).where(SongModel.id == song_id))
            ).one()
        except NoResultFound:
            return SuccessFailure.FAILURE

        song.stock_id = song_input.stock_id or song.stock_id
        song.title = song_input.title or song.title
        song.voicing = song_input.voicing or song.voicing

        if song_input.contributors is not None:
            for contrib in song_input.contributors.add:
                contributor = (
                    await session.scalars(
                        select(ContributorModel).where(
                            ContributorModel.person_name == contrib.contributor_name
                        )
                    )
                ).one_or_none() or ContributorModel(contrib.contributor_name)
                session.add(contributor)
                await session.flush()
                await session.refresh(contributor)
                song.contributors.append(
                    ContributorAssociation(contributor, contrib.contribution_type)
                )
                await session.flush()

            for contrib in song_input.contributors.remove:
                await session.execute(
                    delete(ContributorAssociation).where(
                        and_(
                            ContributorAssociation.song_id == song_id,
                            ContributorAssociation.contributor.has(
                                ContributorModel.person_name == contrib.contributor_name
                            ),
                            ContributorAssociation.contribution_type
                            == contrib.contribution_type,
                        )
                    )
                )

        await session.commit()

    return SuccessFailure.SUCCESS
