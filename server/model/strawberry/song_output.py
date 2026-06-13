from typing import Optional

import strawberry

from model.database.song import SongModel


@strawberry.type
class Song:
    id: strawberry.ID
    title: str = strawberry.field(description="Title")
    voicing: str = strawberry.field(description="SSAA / SATB / TTBB / etc")
    stock_id: Optional[int] = strawberry.field(description="Stock ID")

    @classmethod
    def marshal(cls, model: SongModel) -> "Song":
        return cls(
            id=strawberry.ID(model.id),
            title=model.title,
            voicing=model.voicing,
            stock_id=model.stock_id,
        )
