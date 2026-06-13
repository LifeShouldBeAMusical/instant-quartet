from strawberry import Schema

from query import SongQuery

app_schema = Schema(query=SongQuery)
