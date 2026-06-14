<script setup lang="ts">
import { SongFragment, VoicePart } from '@/graphql/types';
import { useMusicStore } from '@/store/music-store';
import {
	IonButton,
	IonButtons,
	IonChip,
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
	<div class="song-button">
		<div class="title-container">
			<span class="title">
				{{ song.title }}
			</span>
			<span>({{ song.voicing }})</span>
			<div v-if="learnedParts">
				<ion-chip
					v-for="part in learnedParts"
					:key="part"
					:class="`learned-part ${part.toLowerCase()}`"
					outline
					>{{ part }}</ion-chip
				>
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
				<ion-buttons class="learn-button-container">
					<ion-button
						v-for="part in ['TENOR', 'LEAD', 'BARI', 'BASS']"
						:key="part"
						@click="() => learn(part)"
						:disabled="learnedParts?.includes(part)"
						:class="part.toLowerCase()"
						fill="solid"
					>
						{{ part }}
					</ion-button>
				</ion-buttons>
			</ion-content>
		</ion-modal>
	</div>
</template>

<style lang="scss">
.song-button {
	.title-container {
		display: flex;
		flex-flow: row wrap;
		gap: 12px;
		align-items: baseline;
		.title {
			font-size: 150%;
		}
		.tenor {
			border-color: #9a9a00;
		}
		.lead {
			border-color: blue;
		}
		.bari {
			border-color: green;
		}
		.bass {
			border-color: red;
		}
	}
}
.learn-button-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	.tenor {
		color: #9a9a00;
	}
	.lead {
		color: blue;
	}
	.bari {
		color: green;
	}
	.bass {
		color: red;
	}
}
</style>
