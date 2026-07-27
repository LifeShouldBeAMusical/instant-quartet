<script setup lang="ts">
import LoginRegisterForm from '@/components/LoginRegisterForm.vue'
import { useUserStore } from '@/store/user-store'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/vue'
import { computed, onBeforeMount } from 'vue'

const store = useUserStore()

const token = computed(() => store.token)
const userInfo = computed(() =>
	store.userInfo && 'username' in store.userInfo ? store.userInfo : undefined
)
const logout = () => store.logout()

onBeforeMount(() => store.fetchUserInfo())
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
				<div v-if="userInfo">
					Hi, {{ userInfo.displayName ?? userInfo.username }}!
					<ion-buttons>
						<ion-button @click="logout">Log Out</ion-button>
					</ion-buttons>
				</div>
			</template>
			<login-register-form v-else />
		</ion-content>
	</ion-page>
</template>
