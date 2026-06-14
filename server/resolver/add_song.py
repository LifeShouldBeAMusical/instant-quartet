from typing import Optional, Union

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from data.data_connection import get_async_session
from model.database import SongModel, UserSongAssociation
from model.enum import LoginStatus, SuccessFailure,VoicePart
from model.strawberry import LearnSongResult, LoginResult, Song, SongInput
from resolver.authenticate import get_authenticated_user


async def learn_song(
    song_input: SongInput, voice_part: VoicePart, token: str
) -> Union[LoginResult, LearnSongResult]:
    async with get_async_session() as session:
        try:
            user_data = await get_authenticated_user(token, session)
        except NoResultFound:
            return LoginResult(LoginStatus.LOGIN_FAILURE)

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

        if song_data is not None:
            user_data.songs.append(            UserSongAssociation(song=song_data, voice_part=voice_part))
            await session.commit()
            return LearnSongResult(SuccessFailure.SUCCESS, Song.marshal(song_data))

    return LearnSongResult(SuccessFailure.FAILURE)
