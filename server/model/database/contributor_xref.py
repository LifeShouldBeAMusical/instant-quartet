from sqlalchemy import Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.database.base import ModelBase
from model.database.contributor import ContributorModel
from model.enum.contribution_type import ContributionType


class ContributorAssociation(ModelBase):
    __tablename__ = "contributor_xref"

    song_id: Mapped[int] = mapped_column(
        ForeignKey("song.id"), primary_key=True, nullable=False
    )
    contributor_id: Mapped[int] = mapped_column(
        ForeignKey("contributor.id"), primary_key=True, nullable=False
    )

    contribution_type: Mapped[ContributionType] = mapped_column(
        "contribution_type", Enum(ContributionType), primary_key=True, nullable=False
    )
    """Composer / Lyricist / Arranger"""

    contributor: Mapped[ContributorModel] = relationship(lazy="selectin")

    def __init__(
        self, contributor: ContributorModel, contrib_type: ContributionType
    ) -> "ContributorAssociation":
        self.contributor_id = contributor.id
        self.contribution_type = contrib_type
