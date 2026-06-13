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
				<ion-tab-button tab="tab1" href="/tabs/tab1">
					<ion-icon aria-hidden="true" :icon="person" />
					<ion-label>User</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab2" href="/tabs/tab2">
					<ion-icon aria-hidden="true" :icon="musicalNotes" />
					<ion-label>Music</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab3" href="/tabs/tab3">
					<ion-icon aria-hidden="true" :icon="square" />
					<ion-label>Tab 3</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>
