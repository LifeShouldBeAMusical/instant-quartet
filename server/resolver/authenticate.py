from datetime import datetime, timezone

from sqlalchemy import and_, select

from data.data_connection import get_async_session
from model.database.user import UserModel
from model.strawberry.login_status import LoginStatus


async def authenticate(token: str) -> LoginStatus:
    async with get_async_session() as session:
        user_data = (
            await session.scalars(
                select(UserModel).where(
                    and_(
                        UserModel.auth_token == token,
                        UserModel.auth_token_expiration > datetime.now(tz=timezone.utc),
                    )
                )
            )
        ).one_or_none()
        if user_data is not None:
            return LoginStatus.LOGIN_SUCCESS
    return LoginStatus.LOGIN_FAILURE
