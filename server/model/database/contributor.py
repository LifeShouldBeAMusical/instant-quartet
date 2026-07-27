from typing import Optional

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from model.database.base import ModelBase


class ContributorModel(ModelBase):
    __tablename__ = "contributor"

    id: Mapped[int] = mapped_column(
        "id", Integer, primary_key=True, autoincrement=True, nullable=False
    )
    """ID"""

    person_name: Mapped[str] = mapped_column("person_name", String, nullable=False)
    """Name"""

    def __init__(self, person_name: str) -> "ContributorModel":
        self.person_name = person_name
