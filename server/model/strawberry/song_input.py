import strawberry


@strawberry.input
class SongInfo:
    title: str
    voicing: str = strawberry.input(description="SSAA / SATB / TTBB / etc")


@strawberry.input(one_of=True)
class SongInput:
    id: strawberry.Maybe[int]
    info: strawberry.Maybe[SongInfo]
