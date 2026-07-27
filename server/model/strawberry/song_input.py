from typing import Optional

import strawberry

from model.enum import ContributionType, VoicePart
from model.strawberry.add_remove import AddRemove


@strawberry.input
class SongContributor:
    contributor_name: str
    contribution_type: ContributionType


@strawberry.input
class PartialSongInfo:
    title: Optional[str] = None
    voicing: Optional[str] = None
    stock_id: Optional[int] = None
    contributors: Optional[AddRemove[SongContributor]] = None


@strawberry.input
class SongInfo:
    title: str
    voicing: str
    stock_id: Optional[int] = None
    contributors: Optional[list[SongContributor]] = None


@strawberry.input(one_of=True)
class SongIdentifier:
    id: strawberry.Maybe[int]
    info: strawberry.Maybe[SongInfo]


@strawberry.input
class LearnSongInput:
    token: str
    voice_part: VoicePart
