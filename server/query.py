import strawberry

from resolver.all_songs import fetch_all_songs


@strawberry.type
class AppQuery:

    all_songs = strawberry.field(resolver=fetch_all_songs, description="All Songs")
