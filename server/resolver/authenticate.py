from datetime import datetime, timezone

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from data.data_connection import get_async_session
from model.database.user import UserModel
from model.enum import LoginStatus


async def get_authenticated_user(token: str, session: AsyncSession) -> UserModel:
    return (
        await session.scalars(
            select(UserModel).where(
                and_(
                    UserModel.auth_token == token,
                    UserModel.auth_token_expiration > datetime.now(tz=timezone.utc),
                )
            )
        )
    ).one()


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
