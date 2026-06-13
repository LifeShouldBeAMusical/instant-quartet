from typing import Optional

import strawberry


@strawberry.input
class SongInfo:
    title: str
    voicing: Optional[str] = strawberry.input(description="SSAA / SATB / TTBB / etc")


@strawberry.input(one_of=True)
class SongInput:
    id: strawberry.Maybe[int]
    info: strawberry.Maybe[SongInfo]
