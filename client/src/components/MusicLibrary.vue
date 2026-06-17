<script setup lang="ts">
import SongButton from '@/components/SongButton.vue'
import { Voicing } from '@/graphql/types'
import { useMusicStore } from '@/store/music-store'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { computed, onBeforeMount, ref, watch } from 'vue'

const store = useMusicStore()
const myMusic = computed(() => store.myMusic)
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
		<div>
			<song-button
				v-for="song in myMusic"
				:key="song.song.id"
				:song="song.song"
				:learned-parts="song.parts"
			/>
			<song-button
				v-for="song in music"
				:key="song.id"
				:song="song"
				:learned-parts="[]"
			/>
		</div>
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
