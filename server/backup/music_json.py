from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import select

from data.data_connection import get_async_session
from model.database import SongModel
from model.strawberry import SongInfo
from resolver.add_song import add_song


async def export_music_json() -> JSONResponse:
    async with get_async_session() as session:
        all_music = (await session.scalars(select(SongModel))).all()
        return JSONResponse(content=jsonable_encoder(all_music))


async def import_music_json(songs: list[SongInfo]) -> JSONResponse:
    async with get_async_session() as session:
        for song in songs:
            await add_song(song)
        await session.commit()

    return await export_music_json()
