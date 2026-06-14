import strawberry

from model.database import ContributorAssociation


@strawberry.type
class Contributor:
    contribution_type: str = strawberry.field(
        description="Arranger, Composer, Lyricist, etc"
    )
    contributor_name: str

    @classmethod
    def marshal(cls, model: ContributorAssociation) -> "Contributor":
        return cls(
            contribution_type=model.contribution_type,
            contributor_name=model.contributor.person_name,
        )
