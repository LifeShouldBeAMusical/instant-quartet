<script setup lang="ts">
import {
	IonIcon,
	IonLabel,
	IonPage,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from '@ionic/vue'
import { musicalNotes, person, square } from 'ionicons/icons'
</script>

<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="user" href="/tabs/user">
					<ion-icon aria-hidden="true" :icon="person" />
					<ion-label>User</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="music" href="/tabs/music">
					<ion-icon aria-hidden="true" :icon="musicalNotes" />
					<ion-label>Music</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="quartet" href="/tabs/quartet">
					<ion-icon aria-hidden="true" :icon="square" />
					<ion-label>Tab 3</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>
