<script setup lang="ts">
import SongContributorGroup from '@/components/SongContributorGroup.vue'
import { SongFragment, VoicePart } from '@/graphql/types'
import { useMusicStore } from '@/store/music-store'
import { useUserStore } from '@/store/user-store'
import {
	IonButton,
	IonButtons,
	IonChip,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonModal,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed, ref } from 'vue'

const { song } = defineProps<{
	song: SongFragment
	learnedParts?: VoicePart[]
}>()

const musicStore = useMusicStore()
const userStore = useUserStore()
const token = computed(() => userStore.token)

const modalOpen = ref(false)

const learn = (voicePart: VoicePart) =>
	musicStore.learnSong({ id: Number.parseInt(song.id) }, voicePart)

const openModal = () => (modalOpen.value = true)
const closeModal = () => (modalOpen.value = false)
</script>

<template>
	<ion-item class="song-list-item">
		<ion-label>
			{{ song.title }} ({{ song.voicing }})
			<div v-if="learnedParts" class="learned-part-container">
				<ion-chip
					v-for="part in learnedParts"
					:key="part"
					:class="`learned-part ${part.toLowerCase()}`"
					outline
				>
					{{ part }}
				</ion-chip>
			</div>
		</ion-label>
		<ion-content>
			<song-contributor-group :contributors="song.contributors" />
			<ion-button
				v-if="token && !(learnedParts && learnedParts.length == 4)"
				@click="openModal"
				>Learn</ion-button
			>

			<ion-modal :is-open="token && modalOpen">
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
		</ion-content>
	</ion-item>
</template>

<style lang="scss">
.learned-part-container {
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
