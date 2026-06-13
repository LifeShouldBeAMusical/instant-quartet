import strawberry

from resolver import fetch_all_songs, fetch_my_songs, fetch_share_info


@strawberry.type
class AppQuery:

    all_songs = strawberry.field(resolver=fetch_all_songs, description="All Songs")
    my_songs = strawberry.field(resolver=fetch_my_songs, description="My Songs")
    share_info = strawberry.field(resolver=fetch_share_info, description="Share Info")
