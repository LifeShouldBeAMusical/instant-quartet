from typing import Optional

import strawberry

from model.database.contributor_xref import ContributorAssociation
from model.database.song import SongModel


@strawberry.type
class Contributor:
    id: strawberry.ID
    contribution_type: str = strawberry.field(
        description="Arranger, Composer, Lyricist, etc"
    )
    contributor_name: str

    @classmethod
    def marshal(cls, model: ContributorAssociation) -> "Contributor":
        return cls(
            id=strawberry.ID(model.contributor.id),
            contribution_type=model.contribution_type,
            contributor_name=model.contributor.person_name,
        )


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
