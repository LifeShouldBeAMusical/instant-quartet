import strawberry

from resolver import learn_song, login, register_user


@strawberry.type
class AppMutation:

    login = strawberry.mutation(resolver=login, description="Login")
    register = strawberry.mutation(resolver=register_user, description="Login")

    learn_song = strawberry.mutation(
        resolver=learn_song, description="Add Song to User List"
    )
