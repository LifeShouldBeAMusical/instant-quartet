from typing import Optional

import strawberry

from model.enum import LoginStatus


@strawberry.type
class LoginResult:
    status: str
    token: Optional[str]

    def __init__(self, status: LoginStatus, token: Optional[str] = None):
        self.status = status.name
        self.token = token
