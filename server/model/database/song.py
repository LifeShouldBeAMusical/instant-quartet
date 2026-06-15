import re
from typing import Optional

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase
from model.database.contributor_xref import ContributorAssociation


class SongModel(ModelBase):
    __tablename__ = "song"

    id: Mapped[int] = mapped_column(
        "id", Integer, primary_key=True, autoincrement=True, nullable=False
    )
    """ID"""

    stock_id: Mapped[Optional[int]] = mapped_column(
        "stock_id", Integer, unique=True, nullable=True
    )
    """Stock ID"""

    title: Mapped[str] = mapped_column("song_name", String, nullable=False)
    """Name"""

    title_sort: Mapped[str] = mapped_column("song_name_sort", String, nullable=False)
    """Name"""

    voicing: Mapped[str] = mapped_column("voicing", String, nullable=False)
    """SSAA / SATB / TTBB"""

    contributors: Mapped[list[ContributorAssociation]] = relationship(lazy="selectin")

    def __init__(
        self,
        title: str,
        voicing: Optional[str],
        stock_id: Optional[int],
        contributors: Optional[list[ContributorAssociation]],
    ):
        self.title = title
        self.title_sort = re.sub(r"^(A|An|The|\(.+?\)) (.+)$", r"\2", title)
        self.stock_id = stock_id
        self.voicing = voicing
        self.contributors = contributors
