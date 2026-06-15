from typing import Optional

import strawberry

from model.database import SongModel, UserModel
from model.enum import VoicePart
from model.strawberry.song_output import Song


@strawberry.type
class SharedSongVoice:
    tenor: list[str] = strawberry.field(description="Usernames")
    lead: list[str] = strawberry.field(description="Usernames")
    bari: list[str] = strawberry.field(description="Usernames")
    bass: list[str] = strawberry.field(description="Usernames")

    def __init__(
        self,
        tenor: Optional[list[str]] = None,
        lead: Optional[list[str]] = None,
        bari: Optional[list[str]] = None,
        bass: Optional[list[str]] = None,
    ):
        self.tenor = tenor or []
        self.lead = lead or []
        self.bari = bari or []
        self.bass = bass or []


@strawberry.type
class SharedSong:
    song: Song
    voice_parts: SharedSongVoice

    @strawberry.field
    def distinct_user_count(self) -> int:
        return len(self.distinct_users())

    @strawberry.field
    def distinct_users(self) -> list[str]:
        distinct_users = (
            set(self.voice_parts.tenor)
            | set(self.voice_parts.lead)
            | set(self.voice_parts.bari)
            | set(self.voice_parts.bass)
        )
        return list(distinct_users)

    @classmethod
    def marshal(cls, model: SongModel) -> "SharedSong":
        return cls(song=Song.marshal(model), voice_parts=SharedSongVoice())


@strawberry.type
class SharedSongList:
    songs: list[SharedSong]

    @classmethod
    def marshal(cls, users: list[UserModel]) -> "SharedSongList":
        song_dict: dict[int, SharedSong] = {}

        for user in users:
            for song_asc in user.songs:
                if song_asc.song_id not in song_dict:
                    song_dict[song_asc.song_id] = SharedSong.marshal(song_asc.song)

                match song_asc.voice_part:
                    case VoicePart.TENOR:
                        song_dict[song_asc.song_id].voice_parts.tenor.append(
                            user.username
                        )

                    case VoicePart.LEAD:
                        song_dict[song_asc.song_id].voice_parts.lead.append(
                            user.username
                        )

                    case VoicePart.BARI:
                        song_dict[song_asc.song_id].voice_parts.bari.append(
                            user.username
                        )

                    case VoicePart.BASS:
                        song_dict[song_asc.song_id].voice_parts.bass.append(
                            user.username
                        )

        return cls(
            songs=sorted(
                song_dict.values(), key=lambda x: x.distinct_user_count(), reverse=True
            )
        )
