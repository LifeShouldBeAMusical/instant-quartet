from datetime import datetime, timedelta, timezone
from typing import Optional
import uuid

from passlib.hash import sha256_crypt
from sqlalchemy.exc import IntegrityError

from data.data_connection import get_async_session
from model.database.user import UserModel
from model.strawberry.login_result import LoginResult
from model.strawberry.login_status import LoginStatus


async def register_user(
    username: str, display_name: Optional[str], password: str
) -> LoginResult:
    async with get_async_session() as session:
        user = UserModel(
            username=username,
            display_name=display_name,
            password_hash=sha256_crypt.encrypt(password),
        )
        session.add(user)
        user.auth_token = str(uuid.uuid4())
        user.auth_token_expiration = datetime.now(tz=timezone.utc) + timedelta(hours=24)

        token = user.auth_token

        try:
            await session.flush()
        except IntegrityError:
            return LoginResult(LoginStatus.LOGIN_FAILURE)
        await session.commit()
        return LoginResult(LoginStatus.LOGIN_SUCCESS, token=token)
