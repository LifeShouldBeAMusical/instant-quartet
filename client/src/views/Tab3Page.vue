<script setup lang="ts">
import SongListItem from '@/components/SongListItem.vue'
import { useMusicStore } from '@/store/music-store'
import {
	IonContent,
	IonHeader,
	IonList,
	IonListHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed, onBeforeMount, ref, watch } from 'vue'

const store = useMusicStore()
const sharedSongs = computed(() => store.sharedSongs)

const usernames = ref<string[]>(['LifeShouldBeAMusical'])
watch(usernames, () => store.searchSharedSongs(usernames.value))

onBeforeMount(() => store.searchSharedSongs(usernames.value))
</script>

<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tab 3</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Quartet</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-list>
				<ion-list-header>Shared Songs</ion-list-header>
				<song-list-item
					v-for="song in sharedSongs"
					:key="song.song.id"
					:song="song.song"
					:voice-parts="song.voiceParts"
				/>
			</ion-list>
		</ion-content>
	</ion-page>
</template>
