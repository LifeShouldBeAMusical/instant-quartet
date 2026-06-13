from typing import Optional
from uuid import UUID

import strawberry

from model.strawberry.login_status import LoginStatus


@strawberry.type
class LoginResult:
    status: LoginStatus
    token: Optional[UUID]

    def __init__(self, status: LoginStatus, token: Optional[str] = None):
        self.status = status
        self.token = token
