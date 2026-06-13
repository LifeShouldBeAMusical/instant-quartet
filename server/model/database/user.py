from typing import List, Optional

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase
from model.database.song import SongModel
from model.database.user_song_xref import user_song_xref_table


class UserModel(ModelBase):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(
        "id", Integer, primary_key=True, autoincrement=True, nullable=False
    )
    """ID"""

    username: Mapped[str] = mapped_column("username", String, nullable=False)
    display_name: Mapped[Optional[str]] = mapped_column(
        "display_name", String, nullable=True
    )

    password_encoded: Mapped[str] = mapped_column(
        "password_encoded", String, nullable=False
    )

    songs: Mapped[List[SongModel]] = relationship(secondary=user_song_xref_table)

    def __init__(self, username: str, display_name: Optional[str], password_hash: str):
        self.username = username
        self.display_name = display_name
        self.password_encoded = password_hash
        self.songs = []
