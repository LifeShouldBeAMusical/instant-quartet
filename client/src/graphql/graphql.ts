/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
	  }
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type AllSongsQueryVariables = Exact<{ [key: string]: never }>

export type AllSongsQuery = {
	allSongs: Array<{ ' $fragmentRefs'?: { SongFragment: SongFragment } }>
}

export type SongFragment = {
	id: string
	title: string
	stockId: number | null
	voicing: string
} & { ' $fragmentName'?: 'SongFragment' }

export type LogInMutationVariables = Exact<{
	password: string
	username: string
}>

export type LogInMutation = { login: { token: string | null } }

export type UserInfoQueryVariables = Exact<{
	token: string
}>

export type UserInfoQuery = {
	shareInfo:
		| { displayName: string | null; username: string }
		| Record<PropertyKey, never>
}

export const SongFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Song' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Song' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'stockId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'voicing' } }
				]
			}
		}
	]
} as unknown as DocumentNode<SongFragment, unknown>
export const AllSongsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'AllSongs' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'allSongs' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'Song' }
								}
							]
						}
					}
				]
			}
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Song' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Song' }
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'stockId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'voicing' } }
				]
			}
		}
	]
} as unknown as DocumentNode<AllSongsQuery, AllSongsQueryVariables>
export const LogInDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'LogIn' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'password' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'username' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'password' }
								}
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'username' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'username' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>
export const UserInfoDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'UserInfo' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'token' }
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'shareInfo' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'token' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'token' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'InlineFragment',
									typeCondition: {
										kind: 'NamedType',
										name: { kind: 'Name', value: 'ShareInfo' }
									},
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'displayName' }
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'username' }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>
