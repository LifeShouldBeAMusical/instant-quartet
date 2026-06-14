<script setup lang="ts">
import AddSongForm from '@/components/AddSongForm.vue'
import { useMusicStore } from '@/store/music-store'
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed, onBeforeMount } from 'vue'

const store = useMusicStore()
const music = computed(() => store.music)

onBeforeMount(() => store.fetchMusic())
</script>

<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Music</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Music</ion-title>
				</ion-toolbar>
			</ion-header>

			<div>
				<div>{{ music.length.toLocaleString() }} Songs</div>
				<div>
					<div v-for="song in music" :key="song.id">{{ song }}</div>
				</div>
			</div>
			<add-song-form />
		</ion-content>
	</ion-page>
</template>
