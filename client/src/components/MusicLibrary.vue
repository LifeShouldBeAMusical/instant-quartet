<script setup lang="ts">
import { useMusicStore } from '@/store/music-store'
import { computed, onBeforeMount } from 'vue'
import SongButton from './SongButton.vue'

const store = useMusicStore()
const myMusic = computed(() => store.myMusic)
const music = computed(() =>
	store.music.filter((s) => !(store.myMusicIds && store.myMusicIds[s.id]))
)

onBeforeMount(() => {
	store.fetchMusic()
	store.fetchMyMusic()
})
</script>

<template>
	<div>
		<div>Music Library</div>
		<div>
			{{ (music.length + (myMusic?.length ?? 0)).toLocaleString() }} Songs
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
