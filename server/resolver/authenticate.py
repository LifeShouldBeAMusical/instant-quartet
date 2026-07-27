from datetime import datetime, timezone

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from model.database.user import UserModel


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
