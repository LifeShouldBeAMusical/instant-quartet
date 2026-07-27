import enum

import strawberry


@strawberry.enum
class VoicePart(enum.Enum):
    TENOR = 0
    LEAD = 1
    BARI = 2
    BASS = 4
