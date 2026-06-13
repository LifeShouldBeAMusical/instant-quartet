export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never
}
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
}

export type AppMutation = {
	__typename?: 'AppMutation'
	/** Add Song to User List */
	learnSong: LoginResultLearnSongResult
	/** Login */
	login: LoginResult
	/** Login */
	register: LoginResult
}

export type AppMutationLearnSongArgs = {
	songInput: SongInput
	token: Scalars['String']['input']
}

export type AppMutationLoginArgs = {
	password: Scalars['String']['input']
	username: Scalars['String']['input']
}

export type AppMutationRegisterArgs = {
	displayName?: InputMaybe<Scalars['String']['input']>
	password: Scalars['String']['input']
	username: Scalars['String']['input']
}

export type AppQuery = {
	__typename?: 'AppQuery'
	/** All Songs */
	allSongs: Array<Song>
	/** My Songs */
	mySongs: SongListLoginResult
	/** Share Info */
	shareInfo: ShareInfoLoginResult
	/** Shared Songs */
	sharedSongs: SharedSongListLoginResult
}

export type AppQueryMySongsArgs = {
	token: Scalars['String']['input']
}

export type AppQueryShareInfoArgs = {
	token: Scalars['String']['input']
}

export type AppQuerySharedSongsArgs = {
	token: Scalars['String']['input']
	usernames: Array<Scalars['String']['input']>
}

export type LearnSongResult = {
	__typename?: 'LearnSongResult'
	song?: Maybe<Song>
	status: SuccessFailure
}

export type LoginResult = {
	__typename?: 'LoginResult'
	status: LoginStatus
	token?: Maybe<Scalars['String']['output']>
}

export type LoginResultLearnSongResult = LearnSongResult | LoginResult

export enum LoginStatus {
	LoginFailure = 'LOGIN_FAILURE',
	LoginSuccess = 'LOGIN_SUCCESS',
	UserNotFound = 'USER_NOT_FOUND'
}

export type ShareInfo = {
	__typename?: 'ShareInfo'
	displayName?: Maybe<Scalars['String']['output']>
	username: Scalars['String']['output']
}

export type ShareInfoLoginResult = LoginResult | ShareInfo

export type SharedSong = {
	__typename?: 'SharedSong'
	distinctUserCount: Scalars['Int']['output']
	distinctUsers: Array<Scalars['String']['output']>
	song: Song
	voiceParts: SharedSongVoice
}

export type SharedSongList = {
	__typename?: 'SharedSongList'
	songs: Array<SharedSong>
}

export type SharedSongListLoginResult = LoginResult | SharedSongList

export type SharedSongVoice = {
	__typename?: 'SharedSongVoice'
	/** Usernames */
	bari: Array<Scalars['String']['output']>
	/** Usernames */
	bass: Array<Scalars['String']['output']>
	/** Usernames */
	lead: Array<Scalars['String']['output']>
	/** Usernames */
	tenor: Array<Scalars['String']['output']>
}

export type Song = {
	__typename?: 'Song'
	id: Scalars['ID']['output']
	/** Stock ID */
	stockId?: Maybe<Scalars['Int']['output']>
	/** Title */
	title: Scalars['String']['output']
	/** SSAA / SATB / TTBB / etc */
	voicing: Scalars['String']['output']
}

export type SongInfo = {
	title: Scalars['String']['input']
	voicing: Scalars['String']['input']
}

export type SongInput = {
	id?: InputMaybe<Scalars['Int']['input']>
	info?: InputMaybe<SongInfo>
}

export type SongList = {
	__typename?: 'SongList'
	songs: Array<SongListItem>
}

export type SongListItem = {
	__typename?: 'SongListItem'
	parts: Array<VoicePart>
	song: Song
}

export type SongListLoginResult = LoginResult | SongList

export enum SuccessFailure {
	Failure = 'FAILURE',
	Success = 'SUCCESS'
}

export enum VoicePart {
	Bari = 'BARI',
	Bass = 'BASS',
	Lead = 'LEAD',
	Tenor = 'TENOR'
}

export type AllSongsQueryVariables = Exact<{ [key: string]: never }>

export type AllSongsQuery = {
	__typename?: 'AppQuery'
	allSongs: Array<{
		__typename?: 'Song'
		id: string
		title: string
		voicing: string
		stockId?: number | null
	}>
}
