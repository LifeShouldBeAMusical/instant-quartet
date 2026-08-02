from sqlalchemy import delete, insert, select
from sqlalchemy.exc import IntegrityError

from data.data_connection import get_async_session
from model.database import ContributorAssociation, UserSongAssociation
from model.enum import SuccessFailure


async def merge_song(song_id: int, additional_ids: list[int]) -> SuccessFailure:
    async with get_async_session() as session:

        await session.execute(
            delete(ContributorAssociation).where(
                ContributorAssociation.song_id.in_(additional_ids)
            )
        )

        learned = (
            await session.scalars(
                select(UserSongAssociation).where(
                    UserSongAssociation.song_id.in_(additional_ids)
                )
            )
        ).all()
        for l in learned:
            try:
                await session.execute(
                    insert(UserSongAssociation).values(
                        user_id=l.user_id, voice_part=l.voice_part, song_id=song_id
                    )
                )
            except IntegrityError:
                pass

        await session.execute(
            delete(UserSongAssociation).where(
                UserSongAssociation.song_id.in_(additional_ids)
            )
        )

        await session.commit()

    return SuccessFailure.SUCCESS
