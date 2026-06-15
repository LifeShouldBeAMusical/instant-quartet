<script setup lang="ts">
import { ContributorGroup } from '@/util/group-contributors'
import joinList from '@/util/join-list'

defineProps<{
	contributor: ContributorGroup
}>()
</script>

<template>
	<div class="contributor">
		<div>
			<template
				v-if="
					contributor.contributionType.includes('COMPOSER') &&
					contributor.contributionType.includes('LYRICIST')
				"
			>
				Words and Music by
			</template>
			<template v-else-if="contributor.contributionType.includes('COMPOSER')">
				Music by
			</template>
			<template v-else-if="contributor.contributionType.includes('LYRICIST')">
				Lyrics by
			</template>
			<template v-else-if="contributor.contributionType.includes('ARRANGER')">
				Arr
			</template>
		</div>
		<div>{{ joinList(contributor.contributorName) }}</div>
	</div>
</template>

<style lang="scss">
.contributor {
	display: flex;
	flex-flow: row wrap;
	gap: 6px;
}
</style>
