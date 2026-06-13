from datetime import datetime, timedelta, timezone
import uuid

from passlib.hash import sha256_crypt
from sqlalchemy import select

from data.data_connection import get_async_session
from model.database.user import UserModel
from model.strawberry.login_result import LoginResult
from model.enum.login_status import LoginStatus


async def login(username: str, password: str) -> LoginResult:
    async with get_async_session() as session:
        user_data = (
            await session.scalars(
                select(UserModel).where(UserModel.username == username)
            )
        ).one_or_none()
        if user_data is None:
            return LoginResult(LoginStatus.USER_NOT_FOUND)
        if sha256_crypt.verify(password, user_data.password_encoded):
            if (
                user_data.auth_token is None
                or user_data.auth_token_expiration is None
                or user_data.auth_token_expiration < datetime.now(tz=timezone.utc)
            ):
                user_data.auth_token = str(uuid.uuid4())
                user_data.auth_token_expiration = datetime.now(
                    tz=timezone.utc
                ) + timedelta(hours=24)
            token = user_data.auth_token
            await session.commit()
            return LoginResult(LoginStatus.LOGIN_SUCCESS, token)
    return LoginResult(LoginStatus.LOGIN_FAILURE)
