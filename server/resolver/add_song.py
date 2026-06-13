from datetime import datetime, timezone
from typing import Optional, Union

from sqlalchemy import and_, select

from data.data_connection import get_async_session
from model.database import SongModel, UserModel
from model.strawberry import LoginResult, LoginStatus, Song, SongInput
from resolver.authenticate import authenticate


async def learn_song(song_input: SongInput, token: str) -> Union[Song, LoginResult]:
    if await authenticate(token) == LoginStatus.LOGIN_SUCCESS:
        async with get_async_session() as session:

            user_data = (
                await session.scalars(
                    select(UserModel).where(
                        and_(
                            UserModel.auth_token == token,
                            UserModel.auth_token_expiration
                            > datetime.now(tz=timezone.utc),
                        )
                    )
                )
            ).one()

            song_data: Optional[SongModel] = None
            if song_input.id is not None:
                song_data = (
                    await session.scalars(
                        select(SongModel).where(SongModel.id == song_input.id.value)
                    )
                ).one()
            elif song_input.info is not None:
                song_data = SongModel(
                    title=song_input.info.value.title,
                    voicing=song_input.info.value.voicing,
                )
                session.add(song_data)
                await session.flush()

            if song_data is not None:
                user_data.songs.append(song_data)
                await session.commit()
                return Song.marshal(song_data)

    return LoginResult(LoginStatus.LOGIN_FAILURE)
