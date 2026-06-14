import enum

import strawberry


@strawberry.enum
class ContributionType(enum.Enum):
    COMPOSER = 0
    LYRICIST = 1
    ARRANGER = 2
