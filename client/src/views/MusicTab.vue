<script setup lang="ts">
import AddSongForm from '@/components/AddSongForm.vue'
import MusicLibrary from '@/components/MusicLibrary.vue'
import { useUserStore } from '@/store/user-store'
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed } from 'vue'

const userStore = useUserStore()
const token = computed(() => userStore.token)
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

			<music-library />

			<add-song-form v-if="token" />
		</ion-content>
	</ion-page>
</template>
