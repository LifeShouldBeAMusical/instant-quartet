from typing import Optional

from sqlalchemy import select

from data.data_connection import get_async_session
from model.database import SongModel
from model.enum import Voicing
from model.strawberry import Song


async def fetch_all_songs(voicing: Optional[Voicing] = None) -> list[Song]:
    query = select(SongModel).order_by(SongModel.title_sort)
    if voicing is not None:
        if voicing == Voicing.OTHER:
            query = query.where(
                SongModel.voicing.not_in(
                    [Voicing.SSAA.name, Voicing.SATB.name, Voicing.TTBB.name]
                )
            )
        else:
            query = query.where(SongModel.voicing == voicing.name)

    async with get_async_session() as session:
        all_songs = (await session.scalars(query)).all()
        return [Song.marshal(song) for song in all_songs]
