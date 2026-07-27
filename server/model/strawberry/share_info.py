from typing import Optional

import strawberry

from model.database import UserModel


@strawberry.type
class ShareInfo:
    username: str
    display_name: Optional[str]

    @classmethod
    def marshal(cls, user: UserModel):
        return cls(username=user.username, display_name=user.display_name)
