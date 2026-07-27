from typing import Optional

import strawberry


@strawberry.type
class SharedSongVoice:
    _all_tenor: list[str] = strawberry.Private
    _all_lead: list[str] = strawberry.Private
    _all_bari: list[str] = strawberry.Private
    _all_bass: list[str] = strawberry.Private

    @strawberry.field(description="Must sing Tenor")
    def get_lock_tenor(self) -> Optional[list[str]]:
        """Must sing Tenor"""

        if len(self._all_tenor) == 1:
            return self._all_tenor
        if (
            len(
                people_who_only_know_tenor := set(self._all_tenor)
                - set(self._all_lead)
                - set(self._all_bari)
                - set(self._all_bass)
            )
            > 0
        ):
            return list(people_who_only_know_tenor)
        return None

    @strawberry.field(description="Can sing Tenor")
    def tenor(self) -> list[str]:
        """Can sing Tenor"""

        return self.get_lock_tenor() or list(
            set(self._all_tenor)
            - set(self.get_lock_lead() or [])
            - set(self.get_lock_bari() or [])
            - set(self.get_lock_bass() or [])
        )

    @strawberry.field(description="Must sing Lead")
    def get_lock_lead(self) -> Optional[list[str]]:
        """Must sing lead"""

        if (
            len(
                people_who_only_know_lead := set(self._all_lead)
                - set(self._all_tenor)
                - set(self._all_bari)
                - set(self._all_bass)
            )
            > 0
        ):
            return list(people_who_only_know_lead)
        if (
            len(
                only_people_who_can_sing_lead := set(self._all_lead)
                - set(self.get_lock_tenor() or [])
            )
            == 1
        ):
            return list(only_people_who_can_sing_lead)
        return None

    @strawberry.field(description="Can sing Lead")
    def lead(self) -> list[str]:
        """Can sing Lead"""

        return self.get_lock_lead() or list(
            set(self._all_lead)
            - set(self.get_lock_tenor() or [])
            - set(self.get_lock_bari() or [])
            - set(self.get_lock_bass() or [])
        )

    @strawberry.field(description="Must sing Bari")
    def get_lock_bari(self) -> Optional[list[str]]:
        """Must sing bari"""

        if (
            len(
                people_who_only_know_bari := set(self._all_bari)
                - set(self._all_tenor)
                - set(self._all_lead)
                - set(self._all_bass)
            )
            > 0
        ):
            return list(people_who_only_know_bari)
        if (
            len(
                only_people_who_can_sing_bari := set(self._all_bari)
                - set(self.get_lock_tenor() or [])
                - set(self.get_lock_lead() or [])
            )
            == 1
        ):
            return list(only_people_who_can_sing_bari)
        return None

    @strawberry.field(description="Can sing Bari")
    def bari(self) -> list[str]:
        """Can sing Bari"""

        return self.get_lock_bari() or list(
            set(self._all_bari)
            - set(self.get_lock_tenor() or [])
            - set(self.get_lock_lead() or [])
            - set(self.get_lock_bass() or [])
        )

    @strawberry.field(description="Must sing Bass")
    def get_lock_bass(self) -> Optional[list[str]]:
        """Must sing Bass"""

        if (
            len(
                people_who_only_know_bass := set(self._all_bass)
                - set(self._all_tenor)
                - set(self._all_lead)
                - set(self._all_bari)
            )
            > 0
        ):
            return list(people_who_only_know_bass)
        if (
            len(
                only_people_who_can_sing_bass := set(self._all_bass)
                - set(self.get_lock_tenor() or [])
                - set(self.get_lock_lead() or [])
                - set(self.get_lock_bari() or [])
            )
            == 1
        ):
            return list(only_people_who_can_sing_bass)
        return None

    @strawberry.field(description="Can sing Bass")
    def bass(self) -> list[str]:
        """Can sing Bass"""

        return self.get_lock_bass() or list(
            set(self._all_bass)
            - set(self.get_lock_tenor() or [])
            - set(self.get_lock_lead() or [])
            - set(self.get_lock_bari() or [])
        )

    def __init__(
        self,
        tenor: Optional[list[str]] = None,
        lead: Optional[list[str]] = None,
        bari: Optional[list[str]] = None,
        bass: Optional[list[str]] = None,
    ):
        self._all_tenor = tenor or []
        self._all_lead = lead or []
        self._all_bari = bari or []
        self._all_bass = bass or []
