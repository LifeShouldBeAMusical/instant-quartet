from typing import Optional

import strawberry

from model.database import SongModel
from model.strawberry.contributor import Contributor


@strawberry.type
class Song:
    id: strawberry.ID
    title: str = strawberry.field(description="Title")
    voicing: str = strawberry.field(description="SSAA / SATB / TTBB / etc")
    stock_id: Optional[int] = strawberry.field(description="Stock ID")
    contributors: list[Contributor] = strawberry.field(
        description="Composers, Lyricists, Arrangers"
    )

    @classmethod
    def marshal(cls, model: SongModel) -> "Song":
        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            voicing=model.voicing,
            stock_id=model.stock_id,
            contributors=[Contributor.marshal(c) for c in model.contributors],
        )
