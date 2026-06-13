import strawberry

from model.database.user_song_part import UserSongAssociation
from model.enum import VoicePart
from model.strawberry.song_output import Song


@strawberry.type
class SongListItem:
    song: Song
    parts: list[VoicePart]

    @classmethod
    def marshal(cls, xref: UserSongAssociation) -> "SongListItem":
        return cls(song=Song.marshal(xref.song), parts={xref.voice_part})


@strawberry.type
class SongList:
    songs: list[SongListItem]

    @classmethod
    def marshal(cls, xref_list: list[UserSongAssociation]) -> "SongList":
        songs: dict[int, SongListItem] = {}
        for xref in xref_list:
            if xref.song_id not in songs:
                songs[xref.song_id] = SongListItem.marshal(xref)
            else:
                songs[xref.song_id].parts = sorted(
                    set(songs[xref.song_id].parts) | {xref.voice_part}
                )

        return cls(songs=songs.items())
