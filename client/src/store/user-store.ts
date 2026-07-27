import { loginMutation } from '@/graphql/queries/login'
import { registerMutation } from '@/graphql/queries/register'
import { userInfoQuery } from '@/graphql/queries/user-info'
import {
	LoginMutation,
	LoginMutationVariables,
	RegisterMutation,
	RegisterMutationVariables,
	UserInfoQuery,
	UserInfoQueryVariables
} from '@/graphql/types'
import { apolloClient } from '@/store/client'
import { FetchResult } from '@apollo/client/core'
import {
	provideApolloClient,
	useLazyQuery,
	useMutation
} from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

provideApolloClient(apolloClient)

const { load: loadUserInfo, result: userInfoResult } = useLazyQuery<
	UserInfoQuery,
	UserInfoQueryVariables
>(userInfoQuery)
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
const storeToken = (token: string | undefined) =>
	token
		? localStorage.setItem(STORAGE_KEY, token)
		: localStorage.removeItem(STORAGE_KEY)

export const useUserStore = defineStore('user-store', () => {
	const token = ref<string | undefined>(fetchStoredToken())
	watch(token, () => storeToken(token.value))

	const logout = () => (token.value = undefined)

	const fetchUserInfo = () =>
		token.value && loadUserInfo(userInfoQuery, { token: token.value })
	watch(token, fetchUserInfo)

	const userInfo = computed(() =>
		token.value ? userInfoResult.value?.shareInfo : undefined
	)
	watch(userInfo, () => {
		if (userInfo.value) {
			if ('status' in userInfo.value) {
				if (userInfo.value.status == 'LOGIN_FAILURE') {
					token.value = undefined
				}
			}
		}
	})

	onLoginDone(
		(result: FetchResult<LoginMutation>) =>
			(token.value = result.data?.login.token ?? undefined)
	)
	onRegistration(
		(result: FetchResult<RegisterMutation>) =>
			(token.value = result.data?.register.token ?? undefined)
	)

	return { login, logout, register, token, fetchUserInfo, userInfo }
})
