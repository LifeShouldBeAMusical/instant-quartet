from typing import Optional

import strawberry

from model.enum import SuccessFailure
from model.strawberry.song_output import Song


@strawberry.type
class LearnSongResult:
    status: SuccessFailure
    song: Optional[Song]

    def __init__(self, status: SuccessFailure, song: Optional[Song] = None):
        self.status = status
        self.song = song
