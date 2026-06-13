from passlib.hash import sha256_crypt
from sqlalchemy import select

from data.data_connection import get_async_session
from model.database.user import UserModel
from model.strawberry.login_status import LoginStatus


async def login_and_authenticate(username: str, password: str) -> LoginStatus:
    async with get_async_session() as session:
        password_hash = (
            await session.scalars(
                select(UserModel.password_encoded).where(UserModel.username == username)
            )
        ).one_or_none()
        if password_hash is None:
            return LoginStatus.USER_NOT_FOUND
        if sha256_crypt.verify(password, password_hash):
            return LoginStatus.LOGIN_SUCCESS
    return LoginStatus.LOGIN_FAILURE
