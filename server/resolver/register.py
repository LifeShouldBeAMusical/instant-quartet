from typing import Optional

from passlib.hash import sha256_crypt
from sqlalchemy.exc import IntegrityError

from data.data_connection import get_async_session
from model.database.user import UserModel
from model.strawberry.login_status import LoginStatus


async def register_user(
    username: str, display_name: Optional[str], password: str
) -> LoginStatus:
    async with get_async_session() as session:
        user = UserModel(
            username=username,
            display_name=display_name,
            password_hash=sha256_crypt.encrypt(password),
        )
        session.add(user)
        try:
            await session.flush()
        except IntegrityError:
            return LoginStatus.LOGIN_FAILURE
        await session.commit()
    return LoginStatus.LOGIN_SUCCESS
