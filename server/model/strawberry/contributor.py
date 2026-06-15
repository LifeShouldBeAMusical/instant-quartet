import strawberry

from model.enum import ContributionType


@strawberry.type
class Contributor:
    id: strawberry.ID
    contribution_type: list[ContributionType]
    contributor_name: str
