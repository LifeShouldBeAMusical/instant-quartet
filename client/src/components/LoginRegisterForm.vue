<script setup lang="ts">
import { useUserStore } from '@/store/user-store'
import { IonButton, IonInput } from '@ionic/vue'
import { ref } from 'vue'

const store = useUserStore()

const displayName = ref()
const username = ref()
const password = ref()

const login = () => {
	if (username.value && password.value) {
		store.login({ username: username.value, password: password.value })
	}
}
const register = () => {
	if (username.value && password.value) {
		store.register({
			displayName: displayName.value,
			username: username.value,
			password: password.value
		})
	}
}
</script>

<template>
	<ion-input label="Username" v-model="username" required />
	<ion-input label="Password" type="password" v-model="password" required />
	<ion-button @click="login">Login</ion-button>
	<ion-input label="Display Name" v-model="displayName" />
	<ion-button @click="register">Register</ion-button>
</template>
