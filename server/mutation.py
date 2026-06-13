import strawberry

from resolver import login, register_user


@strawberry.type
class AppMutation:

    login = strawberry.mutation(resolver=login, description="Login")
    register = strawberry.mutation(resolver=register_user, description="Login")
