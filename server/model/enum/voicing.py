import enum

import strawberry


@strawberry.enum
class Voicing(enum.Enum):
    SSAA = 0
    SATB = 1
    TTBB = 2
    OTHER = 4
