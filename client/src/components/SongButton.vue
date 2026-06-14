<script setup lang="ts">
import { SongFragment, VoicePart } from '@/graphql/types';
import { useMusicStore } from '@/store/music-store';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonModal,
	IonTitle,
	IonToolbar
} from '@ionic/vue';
import { ref } from 'vue';

const { song } = defineProps<{
	song: SongFragment
	learnedParts: VoicePart[] | undefined
}>()

const musicStore = useMusicStore()

const modalOpen = ref(false)

const learn = (voicePart: VoicePart) =>
	musicStore.learnSong({ id: Number.parseInt(song.id) }, voicePart)

const openModal = () => (modalOpen.value = true)
const closeModal = () => (modalOpen.value = false)
</script>

<template>
	<div>
		<div>
			<span>
				{{ song.title }}
			</span>
			<span>({{ song.voicing }})</span>
			<div v-if="learnedParts">
				<span v-for="part in learnedParts" :key="part">{{ part }}</span>
			</div>
		</div>
		<ion-button @click="openModal">Learn</ion-button>
		<ion-modal :is-open="modalOpen">
			<ion-header>
				<ion-toolbar>
					<ion-title>Learn {{ song.title }}</ion-title>
					<ion-buttons slot="end">
						<ion-button @click="closeModal">Close</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-buttons>
					<ion-button
						v-for="part in ['TENOR', 'LEAD', 'BARI', 'BASS']"
						:key="part"
						@click="() => learn(part)"
						:disabled="learnedParts?.includes(part)"
					>
						{{ part }}
					</ion-button>
				</ion-buttons>
			</ion-content>
		</ion-modal>
	</div>
</template>
