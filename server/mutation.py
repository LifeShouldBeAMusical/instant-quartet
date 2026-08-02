import strawberry

from resolver import learn_song, login, merge_song, register_user, update_song_info


@strawberry.type
class AppMutation:

    login = strawberry.mutation(resolver=login, description="Login")
    register = strawberry.mutation(resolver=register_user, description="Login")

    learn_song = strawberry.mutation(
        resolver=learn_song, description="Add Song to User List"
    )
    merge_songs = strawberry.mutation(resolver=merge_song, description="Merge Songs")
    update_song = strawberry.mutation(
        resolver=update_song_info, description="Update Song"
    )
