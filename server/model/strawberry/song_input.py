from typing import Generic, Optional, TypeVar

import strawberry

from model.enum import ContributionType


@strawberry.input
class SongContributor:
    contributor_name: str
    contribution_type: ContributionType


T = TypeVar("T")


@strawberry.input
class AddRemove(Generic[T]):
    add: list[T] = None
    remove: list[T] = None


@strawberry.input
class AdditionalSongInfo:
    title: Optional[str] = None
    voicing: Optional[str] = None
    stock_id: Optional[int] = None
    contributors: Optional[AddRemove[SongContributor]] = None


@strawberry.input
class SongInfo:
    title: str
    voicing: str


@strawberry.input(one_of=True)
class SongInput:
    id: strawberry.Maybe[int]
    info: strawberry.Maybe[SongInfo]
