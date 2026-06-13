from sqlalchemy import Column, ForeignKey, Table

from model.database.base import ModelBase

user_song_xref_table = Table(
    "user_song_xref",
    ModelBase.metadata,
    Column("user_id", ForeignKey("user.id"), primary_key=True),
    Column("song_id", ForeignKey("song.id"), primary_key=True),
)
