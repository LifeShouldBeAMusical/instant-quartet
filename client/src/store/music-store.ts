import { allSongsQuery } from '@/graphql/queries/all-songs'
import { learnSongMutation } from '@/graphql/queries/learn-song'
import { mySongsQuery } from '@/graphql/queries/my-songs'
import {
	AllSongsQuery,
	LearnSongMutation,
	LearnSongMutationVariables,
	MySongFragment,
	MySongsQuery,
	MySongsQueryVariables,
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
const { load: loadMyMusic, result: myMusicResult } = useLazyQuery<
	MySongsQuery,
	MySongsQueryVariables
>(mySongsQuery)
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

	const fetchMyMusic = () =>
		userStore.token && loadMyMusic(mySongsQuery, { token: userStore.token })
	const myMusic = computed<MySongFragment[] | undefined>(() =>
		myMusicResult.value?.mySongs && 'songs' in myMusicResult.value.mySongs
			? myMusicResult.value.mySongs.songs
			: undefined
	)
	const myMusicIds = computed(() =>
		myMusic.value?.reduce(
			(acc, currentValue): Record<string, string[]> => ({
				...acc,
				[currentValue.song.id]: currentValue.parts
			}),
			{}
		)
	)

	const learnSong = (songInput: SongInput, voicePart: VoicePart) =>
		userStore.token &&
		learnSongMutate({ songInput, voicePart, token: userStore.token })
	onSongLearned(() => {
		loadMusic(allSongsQuery, {}, { fetchPolicy: 'network-only' })
		if (userStore.token) {
			loadMyMusic(
				mySongsQuery,
				{ token: userStore.token },
				{ fetchPolicy: 'network-only' }
			)
		}
	})

	return { fetchMusic, music, fetchMyMusic, myMusic, myMusicIds, learnSong }
})
