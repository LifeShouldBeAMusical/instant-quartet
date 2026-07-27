<script setup lang="ts">
import { useMusicStore } from '@/store/music-store'
import { IonInput } from '@ionic/vue'
import { ref, watch } from 'vue'

const store = useMusicStore()

const searchValue = ref<string | undefined>()
watch(searchValue, () => store.filterText(searchValue.value))
</script>

<template>
	<ion-input placeholder="Search Text" v-model="searchValue" />
</template>

<style lang="scss"></style>
