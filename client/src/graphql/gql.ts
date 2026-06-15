import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
	'\n\tquery AllSongs {\n\t\tallSongs {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n': typeof types.AllSongsDocument
	'\n\tmutation LearnSong($songInput: SongIdentifier!, $learned: LearnSongInput) {\n\t\tlearnSong(songInput: $songInput, learned: $learned) {\n\t\t\t... on LearnSongResult {\n\t\t\t\t__typename\n\t\t\t\tstatus\n\t\t\t\tsong {\n\t\t\t\t\t...Song\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n': typeof types.LearnSongDocument
	'\n\tmutation Login($password: String!, $username: String!) {\n\t\tlogin(password: $password, username: $username) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n': typeof types.LoginDocument
	'\n\tquery MySongs($token: String!) {\n\t\tmySongs(token: $token) {\n\t\t\t... on SongList {\n\t\t\t\tsongs {\n\t\t\t\t\t...MySong\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n\n\tfragment MySong on SongListItem {\n\t\tparts\n\t\tsong {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n': typeof types.MySongsDocument
	'\n\tmutation Register(\n\t\t$displayName: String\n\t\t$password: String!\n\t\t$username: String!\n\t) {\n\t\tregister(\n\t\t\tpassword: $password\n\t\t\tusername: $username\n\t\t\tdisplayName: $displayName\n\t\t) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n': typeof types.RegisterDocument
	'\nquery SharedSongs($token: String!, $usernames: [String!]!) {\n  sharedSongs(token: $token, usernames: $usernames) {\n    ... on SharedSongList {\n      __typename\n      songs {\n        distinctUserCount\n        distinctUsers\n        song {\n          ...Song\n        }\n        voiceParts {\n          tenor\n          lead\n          bari\n          bass\n        }\n      }\n    }\n  }\n}\n\t\n': typeof types.SharedSongsDocument
	'\n\tfragment Song on Song {\n\t\tid\n\t\ttitle\n\t\tstockId\n\t\tvoicing\n\t\tcontributors {\n\t\t\t...ContributorXref\n\t\t}\n\t}\n\n\tfragment ContributorXref on Contributor {\n\t\tcontributionType\n\t\tcontributorName\n\t}\n': typeof types.SongFragmentDoc
	'\n\tquery UserInfo($token: String!) {\n\t\tshareInfo(token: $token) {\n\t\t\t... on ShareInfo {\n\t\t\t\tdisplayName\n\t\t\t\tusername\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n': typeof types.UserInfoDocument
}
const documents: Documents = {
	'\n\tquery AllSongs {\n\t\tallSongs {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n':
		types.AllSongsDocument,
	'\n\tmutation LearnSong($songInput: SongIdentifier!, $learned: LearnSongInput) {\n\t\tlearnSong(songInput: $songInput, learned: $learned) {\n\t\t\t... on LearnSongResult {\n\t\t\t\t__typename\n\t\t\t\tstatus\n\t\t\t\tsong {\n\t\t\t\t\t...Song\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n':
		types.LearnSongDocument,
	'\n\tmutation Login($password: String!, $username: String!) {\n\t\tlogin(password: $password, username: $username) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n':
		types.LoginDocument,
	'\n\tquery MySongs($token: String!) {\n\t\tmySongs(token: $token) {\n\t\t\t... on SongList {\n\t\t\t\tsongs {\n\t\t\t\t\t...MySong\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n\n\tfragment MySong on SongListItem {\n\t\tparts\n\t\tsong {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n':
		types.MySongsDocument,
	'\n\tmutation Register(\n\t\t$displayName: String\n\t\t$password: String!\n\t\t$username: String!\n\t) {\n\t\tregister(\n\t\t\tpassword: $password\n\t\t\tusername: $username\n\t\t\tdisplayName: $displayName\n\t\t) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n':
		types.RegisterDocument,
	'\nquery SharedSongs($token: String!, $usernames: [String!]!) {\n  sharedSongs(token: $token, usernames: $usernames) {\n    ... on SharedSongList {\n      __typename\n      songs {\n        distinctUserCount\n        distinctUsers\n        song {\n          ...Song\n        }\n        voiceParts {\n          tenor\n          lead\n          bari\n          bass\n        }\n      }\n    }\n  }\n}\n\t\n':
		types.SharedSongsDocument,
	'\n\tfragment Song on Song {\n\t\tid\n\t\ttitle\n\t\tstockId\n\t\tvoicing\n\t\tcontributors {\n\t\t\t...ContributorXref\n\t\t}\n\t}\n\n\tfragment ContributorXref on Contributor {\n\t\tcontributionType\n\t\tcontributorName\n\t}\n':
		types.SongFragmentDoc,
	'\n\tquery UserInfo($token: String!) {\n\t\tshareInfo(token: $token) {\n\t\t\t... on ShareInfo {\n\t\t\t\tdisplayName\n\t\t\t\tusername\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n':
		types.UserInfoDocument
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery AllSongs {\n\t\tallSongs {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n'
): (typeof documents)['\n\tquery AllSongs {\n\t\tallSongs {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation LearnSong($songInput: SongIdentifier!, $learned: LearnSongInput) {\n\t\tlearnSong(songInput: $songInput, learned: $learned) {\n\t\t\t... on LearnSongResult {\n\t\t\t\t__typename\n\t\t\t\tstatus\n\t\t\t\tsong {\n\t\t\t\t\t...Song\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n'
): (typeof documents)['\n\tmutation LearnSong($songInput: SongIdentifier!, $learned: LearnSongInput) {\n\t\tlearnSong(songInput: $songInput, learned: $learned) {\n\t\t\t... on LearnSongResult {\n\t\t\t\t__typename\n\t\t\t\tstatus\n\t\t\t\tsong {\n\t\t\t\t\t...Song\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation Login($password: String!, $username: String!) {\n\t\tlogin(password: $password, username: $username) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation Login($password: String!, $username: String!) {\n\t\tlogin(password: $password, username: $username) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery MySongs($token: String!) {\n\t\tmySongs(token: $token) {\n\t\t\t... on SongList {\n\t\t\t\tsongs {\n\t\t\t\t\t...MySong\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n\n\tfragment MySong on SongListItem {\n\t\tparts\n\t\tsong {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n'
): (typeof documents)['\n\tquery MySongs($token: String!) {\n\t\tmySongs(token: $token) {\n\t\t\t... on SongList {\n\t\t\t\tsongs {\n\t\t\t\t\t...MySong\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n\n\tfragment MySong on SongListItem {\n\t\tparts\n\t\tsong {\n\t\t\t...Song\n\t\t}\n\t}\n\n\t\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tmutation Register(\n\t\t$displayName: String\n\t\t$password: String!\n\t\t$username: String!\n\t) {\n\t\tregister(\n\t\t\tpassword: $password\n\t\t\tusername: $username\n\t\t\tdisplayName: $displayName\n\t\t) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n'
): (typeof documents)['\n\tmutation Register(\n\t\t$displayName: String\n\t\t$password: String!\n\t\t$username: String!\n\t) {\n\t\tregister(\n\t\t\tpassword: $password\n\t\t\tusername: $username\n\t\t\tdisplayName: $displayName\n\t\t) {\n\t\t\tstatus\n\t\t\ttoken\n\t\t}\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\nquery SharedSongs($token: String!, $usernames: [String!]!) {\n  sharedSongs(token: $token, usernames: $usernames) {\n    ... on SharedSongList {\n      __typename\n      songs {\n        distinctUserCount\n        distinctUsers\n        song {\n          ...Song\n        }\n        voiceParts {\n          tenor\n          lead\n          bari\n          bass\n        }\n      }\n    }\n  }\n}\n\t\n'
): (typeof documents)['\nquery SharedSongs($token: String!, $usernames: [String!]!) {\n  sharedSongs(token: $token, usernames: $usernames) {\n    ... on SharedSongList {\n      __typename\n      songs {\n        distinctUserCount\n        distinctUsers\n        song {\n          ...Song\n        }\n        voiceParts {\n          tenor\n          lead\n          bari\n          bass\n        }\n      }\n    }\n  }\n}\n\t\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tfragment Song on Song {\n\t\tid\n\t\ttitle\n\t\tstockId\n\t\tvoicing\n\t\tcontributors {\n\t\t\t...ContributorXref\n\t\t}\n\t}\n\n\tfragment ContributorXref on Contributor {\n\t\tcontributionType\n\t\tcontributorName\n\t}\n'
): (typeof documents)['\n\tfragment Song on Song {\n\t\tid\n\t\ttitle\n\t\tstockId\n\t\tvoicing\n\t\tcontributors {\n\t\t\t...ContributorXref\n\t\t}\n\t}\n\n\tfragment ContributorXref on Contributor {\n\t\tcontributionType\n\t\tcontributorName\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: '\n\tquery UserInfo($token: String!) {\n\t\tshareInfo(token: $token) {\n\t\t\t... on ShareInfo {\n\t\t\t\tdisplayName\n\t\t\t\tusername\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n'
): (typeof documents)['\n\tquery UserInfo($token: String!) {\n\t\tshareInfo(token: $token) {\n\t\t\t... on ShareInfo {\n\t\t\t\tdisplayName\n\t\t\t\tusername\n\t\t\t}\n\t\t\t... on LoginResult {\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n']

export function gql(source: string) {
	return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
