import strawberry

from resolver import login_and_authenticate, register_user


@strawberry.type
class AppMutation:

    login = strawberry.mutation(resolver=login_and_authenticate, description="Login")
    register = strawberry.mutation(resolver=register_user, description="Login")
