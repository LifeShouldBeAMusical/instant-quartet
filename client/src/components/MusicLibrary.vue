<script setup lang="ts">
import { useMusicStore } from '@/store/music-store'
import { computed, onBeforeMount } from 'vue'
import SongButton from './SongButton.vue'

const store = useMusicStore()
const music = computed(() => store.music)

onBeforeMount(() => store.fetchMusic())
</script>

<template>
	<div>
		<div>Music Library</div>
		<div>{{ music.length.toLocaleString() }} Songs</div>
		<div>
			<song-button v-for="song in music" :key="song.id" :song="song" />
		</div>
	</div>
</template>
