from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase
from model.database.contributor import ContributorModel


class ContributorAssociation(ModelBase):
    __tablename__ = "contributor_xref"

    song_id: Mapped[int] = mapped_column(
        ForeignKey("song.id"), primary_key=True, nullable=False
    )
    contributor_id: Mapped[int] = mapped_column(
        ForeignKey("contributor.id"), primary_key=True, nullable=False
    )

    contribution_type: Mapped[str] = mapped_column(
        "contribution_type", String, nullable=False
    )
    """Composer / Lyricist / Arranger"""

    contributor: Mapped[ContributorModel] = relationship()
