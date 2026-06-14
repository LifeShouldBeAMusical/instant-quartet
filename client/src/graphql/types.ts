/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
	  }
export type LoginStatus = 'LOGIN_FAILURE' | 'LOGIN_SUCCESS' | 'USER_NOT_FOUND'

export type AllSongsQueryVariables = Exact<{ [key: string]: never }>

export type AllSongsQuery = {
	allSongs: Array<{
		id: string
		title: string
		stockId: number | null
		voicing: string
	}>
}

export type SongFragment = {
	id: string
	title: string
	stockId: number | null
	voicing: string
}

export type LoginMutationVariables = Exact<{
	password: string
	username: string
}>

export type LoginMutation = {
	login: { status: LoginStatus; token: string | null }
}

export type RegisterMutationVariables = Exact<{
	displayName?: string | null | undefined
	password: string
	username: string
}>

export type RegisterMutation = {
	register: { status: LoginStatus; token: string | null }
}

export type UserInfoQueryVariables = Exact<{
	token: string
}>

export type UserInfoQuery = {
	shareInfo:
		| { status: LoginStatus }
		| { displayName: string | null; username: string }
}
