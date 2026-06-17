<script setup lang="ts">
import SongListItem from '@/components/SongListItem.vue'
import { Voicing } from '@/graphql/types'
import { useMusicStore } from '@/store/music-store'
import { useUserStore } from '@/store/user-store'
import { IonList, IonListHeader, IonSelect, IonSelectOption } from '@ionic/vue'
import { computed, onBeforeMount, ref, watch } from 'vue'

const userStore = useUserStore()
const token = computed(() => userStore.token)

const store = useMusicStore()
const learnedParts = computed(() => store.myMusicIds ?? {})
const myMusic = computed(() =>
	store.music.filter((s) => store.myMusicIds && store.myMusicIds[s.id])
)
const music = computed(() =>
	store.music.filter((s) => !(store.myMusicIds && store.myMusicIds[s.id]))
)

const voicing = ref('all')
watch(voicing, () =>
	store.filterVoicing(
		['SSAA', 'SATB', 'TTBB', 'OTHER'].includes(voicing.value)
			? (voicing.value as Voicing)
			: undefined
	)
)

onBeforeMount(() => {
	store.fetchMusic()
	store.fetchMyMusic()
})
</script>

<template>
	<div class="music-library">
		<div class="header">
			<div class="title">Music Library</div>

			<ion-select v-model="voicing" label="Voicing">
				<ion-select-option value="all">All</ion-select-option>
				<ion-select-option value="SSAA">SSAA</ion-select-option>
				<ion-select-option value="SATB">SATB</ion-select-option>
				<ion-select-option value="TTBB">TTBB</ion-select-option>
				<ion-select-option value="OTHER">Other</ion-select-option>
			</ion-select>

			<div class="count">
				{{ (music.length + (myMusic?.length ?? 0)).toLocaleString() }} Songs
			</div>
		</div>

		<ion-list v-if="token">
			<ion-list-header>Learned Music</ion-list-header>
			<song-list-item
				v-for="song in myMusic"
				:key="song.id"
				:song="song"
				:learned-parts="learnedParts[song.id]"
			/>
		</ion-list>
		<ion-list>
			<ion-list-header v-if="token">Unlearned Music</ion-list-header>
			<song-list-item v-for="song in music" :key="song.id" :song="song" />
		</ion-list>
	</div>
</template>

<style lang="scss">
.music-library {
	.header {
		margin-bottom: 12px;
		.title {
			font-size: x-large;
		}
	}
}
</style>
