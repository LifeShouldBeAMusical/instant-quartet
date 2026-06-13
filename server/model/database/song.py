from typing import Optional

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from model.database.base import ModelBase


class SongModel(ModelBase):
    __tablename__ = "song"

    id: Mapped[int] = mapped_column(
        "id", Integer, primary_key=True, autoincrement=True, nullable=False
    )
    """ID"""

    stock_id: Mapped[Optional[int]] = mapped_column(
        "stock_id", Integer, unique=True, nullable=True
    )
    """Stock ID"""

    song_name: Mapped[str] = mapped_column("song_name", String, nullable=False)
    """Name"""

    voicing: Mapped[Optional[str]] = mapped_column("voicing", String, nullable=True)
    """SSAA / SATB / TTBB"""
