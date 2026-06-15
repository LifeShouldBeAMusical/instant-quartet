from sqlalchemy import select

from data.data_connection import get_async_session
from model.database import SongModel
from model.strawberry import Song


async def fetch_all_songs() -> list[Song]:
    async with get_async_session() as session:
        all_songs = (await session.scalars(select(SongModel).order_by(SongModel.title_sort))).all()
        return [Song.marshal(song) for song in all_songs]
