<script setup lang="ts">
import { useUserStore } from '@/store/user-store'
import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed, ref } from 'vue'

const store = useUserStore()

const token = computed(() => store.token)

const username = ref()
const password = ref()

const login = () => {
	if (username.value && password.value) {
		store.login({ username: username.value, password: password.value })
	} else {
		console.log('Values Missing')
	}
}
</script>

<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>User</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">User</ion-title>
				</ion-toolbar>
			</ion-header>

			<template v-if="token">
				<div>Token: {{ token }}</div>
			</template>
			<template v-else>
				<ion-input label="Username" v-model="username" required></ion-input>
				<ion-input
					label="Password"
					type="password"
					v-model="password" required
				></ion-input>
				<ion-button @click="login">Log In</ion-button>
			</template>
		</ion-content>
	</ion-page>
</template>
