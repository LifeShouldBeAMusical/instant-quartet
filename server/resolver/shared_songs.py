from typing import Union

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from data.data_connection import get_async_session
from model.database import UserModel
from model.enum import LoginStatus
from model.strawberry import LoginResult, SharedSongList
from resolver.authenticate import get_authenticated_user


async def fetch_shared_songs(
    token: str, usernames: list[str]
) -> Union[SharedSongList, LoginResult]:
    async with get_async_session() as session:
        try:
            user_data = await get_authenticated_user(token, session)
        except NoResultFound:
            return LoginResult(LoginStatus.LOGIN_FAILURE)

        users = await session.scalars(
            select(UserModel).where(UserModel.username.in_(usernames))
        )

        return SharedSongList.marshal([user_data, *users])
