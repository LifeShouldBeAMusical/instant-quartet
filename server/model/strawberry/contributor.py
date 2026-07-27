import strawberry

from model.database import ContributorAssociation
from model.enum import ContributionType


@strawberry.type
class Contributor:
    contribution_type: ContributionType
    contributor_name: str

    @classmethod
    def marshal(cls, model: ContributorAssociation) -> "Contributor":
        return cls(
            contribution_type=model.contribution_type,
            contributor_name=model.contributor.person_name,
        )
