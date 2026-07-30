from typing import Optional, Union

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession

from data.data_connection import get_async_session
from model.database import (
    ContributorModel,
    ContributorAssociation,
    SongModel,
    UserSongAssociation,
)
from model.enum import LoginStatus, SuccessFailure
from model.strawberry import (
    LearnSongInput,
    LearnSongResult,
    LoginResult,
    SongIdentifier,
    SongInfo,
)
from resolver.authenticate import get_authenticated_user


async def learn_song(
    song_input: SongIdentifier, learned: Optional[LearnSongInput] = None
) -> Union[LoginResult, LearnSongResult]:
    async with get_async_session() as session:
        song_data: Optional[SongModel] = None
        if song_input.id is not None:
            song_data = (
                await session.scalars(
                    select(SongModel).where(SongModel.id == song_input.id.value)
                )
            ).one()
        elif song_input.info is not None:
            song_data = await add_song(song_input.info.value)

        if learned is not None:
            try:
                user_data = await get_authenticated_user(learned.token, session)
            except NoResultFound:
                return LoginResult(LoginStatus.LOGIN_FAILURE)

            if song_data is not None:
                user_data.songs.append(
                    UserSongAssociation(
                        song=song_data,
                        user_id=user_data.id,
                        voice_part=learned.voice_part,
                    )
                )

        await session.commit()
        return LearnSongResult(SuccessFailure.SUCCESS)

    return LearnSongResult(SuccessFailure.FAILURE)


async def add_song(info: SongInfo, session: AsyncSession) -> SongModel:
    contributors: list[ContributorAssociation] = []
    if info.contributors is not None:
        for c in info.contributors:
            person = (
                await session.scalars(
                    select(ContributorModel).where(
                        ContributorModel.person_name == c.contributor_name
                    )
                )
            ).one_or_none() or ContributorModel(c.contributor_name)
            session.add(person)
            await session.flush()
            await session.refresh(person)
            contributors.append(ContributorAssociation(person, c.contribution_type))

    song_data = SongModel(
        title=info.title,
        voicing=info.voicing,
        stock_id=info.stock_id,
        contributors=contributors,
    )
    session.add(song_data)
    await session.flush()
    await session.refresh(song_data)

    return song_data
