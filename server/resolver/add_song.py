from typing import Optional, Union

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from data.data_connection import get_async_session
from model.database import SongModel, UserSongAssociation
from model.enum import LoginStatus, SuccessFailure
from model.strawberry import LearnSongResult, LoginResult, Song, SongIdentifier
from model.strawberry.song_input import LearnSongInput
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
            song_data = SongModel(
                title=song_input.info.value.title, voicing=song_input.info.value.voicing
            )
            session.add(song_data)
            await session.flush()
            await session.refresh(song_data)

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
        return LearnSongResult(SuccessFailure.SUCCESS, Song.marshal(song_data))

    return LearnSongResult(SuccessFailure.FAILURE)
