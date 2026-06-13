import enum

from sqlalchemy import Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase
from model.database.song import SongModel
from model.enum import VoicePart


class UserSongAssociation(ModelBase):
    __tablename__ = "user_song_xref"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), primary_key=True, nullable=False
    )
    song_id: Mapped[int] = mapped_column(
        ForeignKey("song.id"), primary_key=True, nullable=False
    )
    voice_part: Mapped[VoicePart] = mapped_column(
        "voice_part", Enum(VoicePart), primary_key=True, nullable=False
    )

    song: Mapped[SongModel] = relationship()
