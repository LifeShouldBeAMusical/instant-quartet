<script setup lang="ts">
import SongButton from '@/components/SongButton.vue'
import { useMusicStore } from '@/store/music-store'
import joinList from '@/util/join-list'
import {
	IonContent,
	IonHeader,
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
			<div class="shared-song-list-container">
				<div
					class="shared-song"
					v-for="song in sharedSongs"
					:key="song.song.id"
				>
					<song-button :song="song.song" :learned-parts="[]" />
					<div class="parts-container">
						<div class="part">
							<div class="label">Tenor:</div>
							<div class="users">{{ joinList(song.voiceParts.tenor) }}</div>
						</div>
						<div class="part">
							<div class="label">Lead:</div>
							<div class="users">{{ joinList(song.voiceParts.lead) }}</div>
						</div>
						<div class="part">
							<div class="label">Bari:</div>
							<div class="users">{{ joinList(song.voiceParts.bari) }}</div>
						</div>
						<div class="part">
							<div class="label">Bass:</div>
							<div class="users">{{ joinList(song.voiceParts.bass) }}</div>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>
