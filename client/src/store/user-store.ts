import { loginMutation } from '@/graphql/queries/login'
import { LogInMutation, LogInMutationVariables } from '@/graphql/types'
import { apolloClient } from '@/store/client'
import { FetchResult } from '@apollo/client'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'

provideApolloClient(apolloClient)

const { mutate: login, onDone: onLoginDone } = useMutation<
	LogInMutation,
	LogInMutationVariables
>(loginMutation)

export const useUserStore = defineStore('user-store', () => {
	const token = ref<string | undefined>()

	onLoginDone(
		(result: FetchResult<LogInMutation>) =>
			(token.value = result.data?.login.token ?? undefined)
	)

	return { login, token }
})
