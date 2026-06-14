<script setup lang="ts">
import { VoicePart } from '@/graphql/types'
import { useMusicStore } from '@/store/music-store'
import { IonInput, IonSelect, IonSelectOption } from '@ionic/vue'
import { computed, ref } from 'vue'

const store = useMusicStore()
// const music = computed(() => store.music)

const songTitle = ref()
const voicing = ref<'SSAA' | 'SATB' | 'TTBB' | 'other' | undefined>()
const voicingCustom = ref()
const voicePart = ref<VoicePart | undefined>()

const enableButton = computed(() =>
	songTitle.value &&
	voicing.value &&
	(voicing.value != 'other' || voicingCustom.value) &&
	voicePart.value
		? true
		: false
)
const learn = () =>
	songTitle.value &&
	voicing.value &&
	(voicing.value != 'other' || voicingCustom.value) &&
	voicePart.value &&
	store.learnSong(
		{
			info: {
				title: songTitle.value,
				voicing: voicing.value == 'other' ? voicingCustom.value : voicing.value
			}
		},
		voicePart.value
	)
</script>

<template>
	<div>
		<div>Learn Song</div>
		<div>
			<ion-input label="Song Title" v-model="songTitle" />
			<div>{{ songTitle }}</div>
			<ion-select label="Voicing" v-model="voicing">
				<ion-select-option value="SSAA">SSAA</ion-select-option>
				<ion-select-option value="SATB">SATB</ion-select-option>
				<ion-select-option value="TTBB">TTBB</ion-select-option>
				<ion-select-option value="other">Other</ion-select-option>
			</ion-select>
			<div>{{ voicing }}</div>
			<div v-if="voicing == 'other'">
				<ion-input label="Custom Voicing" v-model="voicingCustom" />
				<div>{{ voicingCustom }}</div>
			</div>
			<ion-select label="Voice Part" v-model="voicePart">
				<ion-select-option value="TENOR">Tenor</ion-select-option>
				<ion-select-option value="LEAD">Lead</ion-select-option>
				<ion-select-option value="BARI">Bari</ion-select-option>
				<ion-select-option value="BASS">Bass</ion-select-option>
			</ion-select>
			<div>{{ voicePart }}</div>
			<ion-button @click="learn" :disabled="!enableButton">
				Learn Song
			</ion-button>
		</div>
	</div>
</template>
