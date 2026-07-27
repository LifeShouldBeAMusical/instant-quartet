from enum import Enum

import strawberry


@strawberry.enum
class LoginStatus(Enum):

    LOGIN_FAILURE = 0
    LOGIN_SUCCESS = 1
    USER_NOT_FOUND = 2
