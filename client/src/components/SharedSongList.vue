<script setup lang="ts">
import SongListItem from '@/components/library/SongListItem.vue'
import { useMusicStore } from '@/store/music-store'
import { IonList, IonListHeader } from '@ionic/vue'
import { computed, onBeforeMount, watch } from 'vue'

const props = defineProps<{ usernames: string[] }>()

const store = useMusicStore()
const sharedSongs = computed(() => store.sharedSongs)

watch(props.usernames, () => store.searchSharedSongs(props.usernames))

onBeforeMount(() => store.searchSharedSongs(props.usernames))
</script>

<template>
	<ion-list>
		<ion-list-header>Shared Songs</ion-list-header>
		<song-list-item
			v-for="song in sharedSongs"
			:key="song.song.id"
			:song="song.song"
			:voice-parts="song.voiceParts"
		/>
	</ion-list>
</template>
