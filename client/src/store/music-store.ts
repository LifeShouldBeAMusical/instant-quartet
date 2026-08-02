import { allSongsQuery } from '@/graphql/queries/all-songs'
import { learnSongMutation } from '@/graphql/queries/learn-song'
import { mySongsQuery } from '@/graphql/queries/my-songs'
import { sharedSongsQuery } from '@/graphql/queries/shared-songs'
import {
	AllSongsQuery,
	AllSongsQueryVariables,
	LearnSongMutation,
	LearnSongMutationVariables,
	MySongFragment,
	MySongsQuery,
	MySongsQueryVariables,
	SharedSongsQuery,
	SharedSongsQueryVariables,
	SongFragment,
	SongIdentifier,
	VoicePart,
	Voicing
} from '@/graphql/types'
import { apolloClient } from '@/store/client'
import { useUserStore } from '@/store/user-store'
import {
	provideApolloClient,
	useLazyQuery,
	useMutation
} from '@vue/apollo-composable'
import Fuse from 'fuse.js/basic'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

provideApolloClient(apolloClient)

const {
	load: loadMusic,
	result: musicResult,
	loading
} = useLazyQuery<AllSongsQuery, AllSongsQueryVariables>(allSongsQuery)
const { load: loadSharedSongs, result: sharedMusicResult } = useLazyQuery<
	SharedSongsQuery,
	SharedSongsQueryVariables
>(sharedSongsQuery)
const { load: loadMyMusic, result: myMusicResult } = useLazyQuery<
	MySongsQuery,
	MySongsQueryVariables
>(mySongsQuery)
const { mutate: learnSongMutate, onDone: onSongLearned } = useMutation<
	LearnSongMutation,
	LearnSongMutationVariables
>(learnSongMutation)

export const useMusicStore = defineStore('music-store', () => {
	const fetchMusic = () => loadMusic(allSongsQuery, { voicing: voicing.value })
	const music = computed<SongFragment[]>(
		() => musicResult.value?.allSongs ?? []
	)

	const fetchMyMusic = () =>
		userStore.token && loadMyMusic(mySongsQuery, { token: userStore.token })
	const myMusic = computed<MySongFragment[] | undefined>(() =>
		myMusicResult.value?.mySongs && 'songs' in myMusicResult.value.mySongs
			? myMusicResult.value.mySongs.songs
			: undefined
	)
	const myMusicIds = computed(() =>
		myMusic.value?.reduce(
			(acc, currentValue): Record<string, VoicePart[]> => ({
				...acc,
				[currentValue.song.id]: currentValue.parts
			}),
			{}
		)
	)
	const fuse = computed(
		() =>
			new Fuse(music.value, {
				isCaseSensitive: false,
				keys: ['title', 'contributors.contributorName']
			})
	)

	const textSearch = ref<string | undefined>()
	const filteredMusic = computed(() =>
		textSearch.value
			? fuse.value.search(textSearch.value).map((result) => result.item)
			: music.value
	)
	const filterText = (t: string | undefined) => (textSearch.value = t)

	const voicing = ref<Voicing | undefined>()
	const filterVoicing = (v: Voicing | undefined) => (voicing.value = v)
	watch(voicing, fetchMusic)

	const userStore = useUserStore()

	const learnSong = (songInput: SongIdentifier, voicePart: VoicePart) =>
		userStore.token &&
		learnSongMutate({
			songInput,
			learned: { voicePart, token: userStore.token }
		})
	const addSong = (songInput: SongIdentifier) => learnSongMutate({ songInput })

	onSongLearned(() => {
		loadMusic(allSongsQuery, {}, { fetchPolicy: 'network-only' })
		if (userStore.token) {
			loadMyMusic(
				mySongsQuery,
				{ token: userStore.token },
				{ fetchPolicy: 'no-cache' }
			)
		}
	})

	const sharedSongs = computed(() => sharedMusicResult.value?.sharedSongs.songs)
	const searchSharedSongs = (usernames: string[]) =>
		usernames.length &&
		userStore.token &&
		loadSharedSongs(sharedSongsQuery, { token: userStore.token, usernames })

	return {
		fetchMusic,
		filterVoicing,
		filterText,
		music: filteredMusic,
		loading,
		fetchMyMusic,
		myMusic,
		myMusicIds,
		addSong,
		learnSong,
		sharedSongs,
		searchSharedSongs
	}
})
