<script setup lang="ts">
import { ShareInfoFragment } from '@/graphql/types'
import { useUserStore } from '@/store/user-store'
import { IonButton, IonModal } from '@ionic/vue'
import type { Level, RenderAs } from 'qrcode.vue'
import QrcodeVue from 'qrcode.vue'
import { computed, ref } from 'vue'

const store = useUserStore()
const shareInfo = computed<ShareInfoFragment | undefined>(() =>
	store.userInfo && 'username' in store.userInfo ? store.userInfo : undefined
)

const modal = ref()
const closeModal = () => modal.value.$el.dismiss(null)

const value = computed(() =>
	shareInfo.value ? JSON.stringify(shareInfo.value) : undefined
)
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
const background = ref('#ffffff')
const foreground = ref('#000000')
//   const margin = ref(0)

const radius = ref(0)
</script>

<template>
	<ion-button id="qr-code">QR Code</ion-button>

	<ion-modal trigger="qr-code" ref="modal">
		<ion-header>
			<ion-toolbar>
				<ion-title>Scan With App</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="closeModal">Close</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<qrcode-vue
				:value="value"
				:level="level"
				:render-as="renderAs"
				:background="background"
				:foreground="foreground"
				:radius="radius"
				:height="200"
				:width="200"
			/>
		</ion-content>
	</ion-modal>
</template>

<style lang="scss"></style>
