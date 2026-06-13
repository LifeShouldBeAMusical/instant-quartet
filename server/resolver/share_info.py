from typing import Union

from sqlalchemy.exc import NoResultFound

from data.data_connection import get_async_session
from model.enum.login_status import LoginStatus
from model.strawberry import ShareInfo
from model.strawberry.login_result import LoginResult
from resolver.authenticate import get_authenticated_user


async def fetch_share_info(token: str) -> Union[LoginResult, ShareInfo]:
    async with get_async_session() as session:
        try:
            user_data = await get_authenticated_user(token, session)
        except NoResultFound:
            return LoginResult(LoginStatus.LOGIN_FAILURE)

        return ShareInfo.marshal(user_data)
