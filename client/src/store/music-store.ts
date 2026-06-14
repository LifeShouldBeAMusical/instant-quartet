import { allSongsQuery } from '@/graphql/queries/all-songs'
import { learnSongMutation } from '@/graphql/queries/learn-song'
import {
	AllSongsQuery,
	LearnSongMutation,
	LearnSongMutationVariables,
	SongFragment,
	SongInput,
	VoicePart
} from '@/graphql/types'
import { apolloClient } from '@/store/client'
import { useUserStore } from '@/store/user-store'
import {
	provideApolloClient,
	useLazyQuery,
	useMutation
} from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed } from 'vue'

provideApolloClient(apolloClient)

const { load: loadMusic, result: musicResult } =
	useLazyQuery<AllSongsQuery>(allSongsQuery)
const { mutate: learnSongMutate, onDone: onSongLearned } = useMutation<
	LearnSongMutation,
	LearnSongMutationVariables
>(learnSongMutation)

export const useMusicStore = defineStore('music-store', () => {
	const fetchMusic = () => loadMusic()
	const music = computed<SongFragment[]>(
		() => musicResult.value?.allSongs ?? []
	)

	const userStore = useUserStore()
	const learnSong = (songInput: SongInput, voicePart: VoicePart) =>
		userStore.token &&
		learnSongMutate({ songInput, voicePart, token: userStore.token })

	onSongLearned(() => {
		loadMusic(allSongsQuery, {}, { fetchPolicy: 'network-only' })
	})

	return { fetchMusic, music, learnSong }
})
