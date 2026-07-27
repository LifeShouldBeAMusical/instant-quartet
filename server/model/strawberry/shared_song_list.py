import strawberry

from model.database import SongModel, UserModel
from model.enum import VoicePart
from model.strawberry.shared_song_voice import SharedSongVoice
from model.strawberry.song_output import Song


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
            set(self.voice_parts._all_tenor)
            | set(self.voice_parts._all_lead)
            | set(self.voice_parts._all_bari)
            | set(self.voice_parts._all_bass)
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
                        song_dict[song_asc.song_id].voice_parts._all_tenor.append(
                            user.username
                        )

                    case VoicePart.LEAD:
                        song_dict[song_asc.song_id].voice_parts._all_lead.append(
                            user.username
                        )

                    case VoicePart.BARI:
                        song_dict[song_asc.song_id].voice_parts._all_bari.append(
                            user.username
                        )

                    case VoicePart.BASS:
                        song_dict[song_asc.song_id].voice_parts._all_bass.append(
                            user.username
                        )

        return cls(
            songs=sorted(
                song_dict.values(), key=lambda x: x.distinct_user_count(), reverse=True
            )
        )
