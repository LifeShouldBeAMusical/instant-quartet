from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

from schema import app_schema

app = FastAPI()

app.include_router(GraphQLRouter(schema=app_schema), prefix="/graphql")
