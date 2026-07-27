<script setup lang="ts">
import SongContributor from '@/components/library/SongContributor.vue'
import { ContributorXrefFragment } from '@/graphql/types'
import groupContributors from '@/util/group-contributors'

defineProps<{ contributors: ContributorXrefFragment[] }>()
</script>

<template>
	<div class="contributors">
		<song-contributor
			v-for="(c, idx) in groupContributors(contributors)"
			:key="idx"
			:contributor="c"
		/>
	</div>
</template>

<style lang="scss">
.contributors {
	display: flex;
	flex-flow: row wrap;

	gap: 4px 16px;
	align-items: baseline;
	justify-content: start;
}
</style>
