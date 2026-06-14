import { loginMutation } from '@/graphql/queries/login'
import { registerMutation } from '@/graphql/queries/register'
import {
	LoginMutation,
	LoginMutationVariables,
	RegisterMutation,
	RegisterMutationVariables
} from '@/graphql/types'
import { apolloClient } from '@/store/client'
import { FetchResult } from '@apollo/client'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

provideApolloClient(apolloClient)

const { mutate: login, onDone: onLoginDone } = useMutation<
	LoginMutation,
	LoginMutationVariables
>(loginMutation)
const { mutate: register, onDone: onRegistration } = useMutation<
	RegisterMutation,
	RegisterMutationVariables
>(registerMutation)

const STORAGE_KEY = 'user-token'

const fetchStoredToken = () => localStorage.getItem(STORAGE_KEY) ?? undefined
const storeToken = (token: string | undefined) => token ? localStorage.setItem(STORAGE_KEY, token) : localStorage.removeItem(STORAGE_KEY)

export const useUserStore = defineStore('user-store', () => {
	const token = ref<string | undefined>(fetchStoredToken() )
	watch(token, () => storeToken(token.value))

	onLoginDone(
		(result: FetchResult<LoginMutation>) =>
			(token.value = result.data?.login.token ?? undefined)
	)
	onRegistration(
		(result: FetchResult<RegisterMutation>) =>
			(token.value = result.data?.register.token ?? undefined)
	)

	return { login, register, token }
})
