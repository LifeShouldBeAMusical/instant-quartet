import enum

import strawberry


@strawberry.enum
class SuccessFailure(enum.Enum):
    FAILURE = 0
    SUCCESS = 1
