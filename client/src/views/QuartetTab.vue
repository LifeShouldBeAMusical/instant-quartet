<script setup lang="ts">
import QRCodeModal from '@/components/QRCodeModal.vue'
import SharedSongList from '@/components/SharedSongList.vue'
import { ShareInfoFragment } from '@/graphql/types'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed, ref } from 'vue'

const people = ref<ShareInfoFragment[]>([])
const usernames = computed(() => people.value.map((person) => person.username))
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

			<ion-buttons>
				<q-r-code-modal />
				<ion-button> Scan People </ion-button>
			</ion-buttons>

			<shared-song-list :usernames="usernames" />
		</ion-content>
	</ion-page>
</template>
