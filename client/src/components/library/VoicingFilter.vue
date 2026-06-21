<script setup lang="ts">
import { Voicing } from '@/graphql/types'
import { useMusicStore } from '@/store/music-store'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { ref, watch } from 'vue'

const store = useMusicStore()

const voicing = ref('all')
watch(voicing, () =>
	store.filterVoicing(
		['SSAA', 'SATB', 'TTBB', 'OTHER'].includes(voicing.value)
			? (voicing.value as Voicing)
			: undefined
	)
)
</script>

<template>
	<ion-select v-model="voicing" label="Voicing">
		<ion-select-option value="all">All</ion-select-option>
		<ion-select-option value="SSAA">SSAA</ion-select-option>
		<ion-select-option value="SATB">SATB</ion-select-option>
		<ion-select-option value="TTBB">TTBB</ion-select-option>
		<ion-select-option value="OTHER">Other</ion-select-option>
	</ion-select>
</template>

<style lang="scss"></style>
