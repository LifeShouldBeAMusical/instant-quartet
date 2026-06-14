/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
	  }
export type LoginStatus = 'LOGIN_FAILURE' | 'LOGIN_SUCCESS' | 'USER_NOT_FOUND'

export type SongInfo = {
	title: string
	voicing: string
}

export type SongInput = {
	id?: number | null | undefined
	info?: SongInfo | null | undefined
}

export type SuccessFailure = 'FAILURE' | 'SUCCESS'

export type VoicePart = 'BARI' | 'BASS' | 'LEAD' | 'TENOR'

export type AllSongsQueryVariables = Exact<{ [key: string]: never }>

export type AllSongsQuery = {
	allSongs: Array<{
		id: string
		title: string
		stockId: number | null
		voicing: string
		contributors: Array<{
			id: string
			contributionType: string
			contributorName: string
		}>
	}>
}

export type LearnSongMutationVariables = Exact<{
	songInput: SongInput
	token: string
	voicePart: VoicePart
}>

export type LearnSongMutation = {
	learnSong:
		| {
				__typename: 'LearnSongResult'
				status: SuccessFailure
				song: {
					id: string
					title: string
					stockId: number | null
					voicing: string
					contributors: Array<{
						id: string
						contributionType: string
						contributorName: string
					}>
				} | null
		  }
		| Record<PropertyKey, never>
}

export type LoginMutationVariables = Exact<{
	password: string
	username: string
}>

export type LoginMutation = {
	login: { status: LoginStatus; token: string | null }
}

export type MySongsQueryVariables = Exact<{
	token: string
}>

export type MySongsQuery = {
	mySongs:
		| { status: LoginStatus }
		| {
				songs: Array<{
					parts: Array<VoicePart>
					song: {
						id: string
						title: string
						stockId: number | null
						voicing: string
						contributors: Array<{
							id: string
							contributionType: string
							contributorName: string
						}>
					}
				}>
		  }
}

export type MySongFragment = {
	parts: Array<VoicePart>
	song: {
		id: string
		title: string
		stockId: number | null
		voicing: string
		contributors: Array<{
			id: string
			contributionType: string
			contributorName: string
		}>
	}
}

export type RegisterMutationVariables = Exact<{
	displayName?: string | null | undefined
	password: string
	username: string
}>

export type RegisterMutation = {
	register: { status: LoginStatus; token: string | null }
}

export type SongFragment = {
	id: string
	title: string
	stockId: number | null
	voicing: string
	contributors: Array<{
		id: string
		contributionType: string
		contributorName: string
	}>
}

export type UserInfoQueryVariables = Exact<{
	token: string
}>

export type UserInfoQuery = {
	shareInfo:
		| { status: LoginStatus }
		| { displayName: string | null; username: string }
}
