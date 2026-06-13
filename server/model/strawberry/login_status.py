from enum import Enum


class LoginStatus(Enum):

    LOGIN_FAILURE = 0
    USER_NOT_FOUND = 1
    LOGIN_SUCCESS = 2
