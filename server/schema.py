from strawberry import Schema

from mutation import AppMutation
from query import AppQuery

app_schema = Schema(query=AppQuery, mutation=AppMutation)
