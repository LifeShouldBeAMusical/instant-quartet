<script setup lang="ts">
import SongContributorGroup from '@/components/library/SongContributorGroup.vue'
import {
	SharedSongVoiceFragment,
	SongFragment,
	VoicePart
} from '@/graphql/types'
import { useMusicStore } from '@/store/music-store'
import { useUserStore } from '@/store/user-store'
import joinList from '@/util/join-list'
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
	voiceParts?: SharedSongVoiceFragment
}>()

const musicStore = useMusicStore()
const userStore = useUserStore()
const token = computed(() => userStore.token)

const modal = ref()
const closeModal = () => modal.value.$el.dismiss(null)

const learn = (voicePart: VoicePart) =>
	musicStore.learnSong({ id: Number.parseInt(song.id) }, voicePart)
</script>

<template>
	<ion-item class="song-list-item">
		<ion-label>
			<div class="title-container">
				<div class="song-title">{{ song.title }} ({{ song.voicing }})</div>
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
				<ion-button
					v-if="token && !(learnedParts && learnedParts.length == 4)"
					:id="`open-modal-${song.id}`"
				>
					Learn
				</ion-button>
			</div>
			<div class="parts-container" v-if="voiceParts">
				<div class="part">
					<div class="label">Tenor:</div>
					<div class="users">{{ joinList(voiceParts.tenor) }}</div>
				</div>
				<div class="part">
					<div class="label">Lead:</div>
					<div class="users">{{ joinList(voiceParts.lead) }}</div>
				</div>
				<div class="part">
					<div class="label">Bari:</div>
					<div class="users">{{ joinList(voiceParts.bari) }}</div>
				</div>
				<div class="part">
					<div class="label">Bass:</div>
					<div class="users">{{ joinList(voiceParts.bass) }}</div>
				</div>
			</div>

			<song-contributor-group :contributors="song.contributors" />

			<ion-modal :trigger="`open-modal-${song.id}`" ref="modal">
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
		</ion-label>
	</ion-item>
</template>

<style lang="scss">
.song-list-item {
	.title-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;

		.song-title {
			font-size: large;
			flex-grow: 1;
		}
	}

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
