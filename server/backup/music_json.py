from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import select

from data.data_connection import get_async_session
from model.database.song import SongModel


async def music_json() -> JSONResponse:
    async with get_async_session() as session:
        all_music = (await session.scalars(select(SongModel))).all()
        return JSONResponse(content=jsonable_encoder(all_music))
