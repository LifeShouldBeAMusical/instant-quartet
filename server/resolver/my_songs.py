from typing import Union

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from data.data_connection import get_async_session
from model.database import UserSongAssociation
from model.enum import LoginStatus
from model.strawberry import LoginResult, SongList
from resolver.authenticate import get_authenticated_user


async def fetch_my_songs(token: str) -> Union[SongList, LoginResult]:
    async with get_async_session() as session:
        try:
            user_data = await get_authenticated_user(token, session)
        except NoResultFound:
            return LoginResult(LoginStatus.LOGIN_FAILURE)

        return SongList.marshal(user_data.songs)
