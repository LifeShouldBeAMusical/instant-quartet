import { allSongsQuery } from '@/graphql/queries/all-songs';
import { AllSongsQuery, SongFragment } from '@/graphql/types';
import { apolloClient } from '@/store/client';
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable';
import { defineStore } from "pinia";
import { computed } from 'vue';

provideApolloClient(apolloClient)


const {load: loadMusic, result} = useLazyQuery<AllSongsQuery>(allSongsQuery)

export const useMusicStore = defineStore('music-store', () => {
    const fetchMusic = () => loadMusic()
    const music = computed<SongFragment[]>(() => result.value?.allSongs ?? [])

    return {fetchMusic, music}
})