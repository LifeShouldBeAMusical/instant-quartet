from typing import Generic, TypeVar

import strawberry

T = TypeVar("T")


@strawberry.input
class AddRemove(Generic[T]):
    add: list[T] = None
    remove: list[T] = None
