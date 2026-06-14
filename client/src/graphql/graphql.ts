/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
	  }
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type LoginStatus = 'LOGIN_FAILURE' | 'LOGIN_SUCCESS' | 'USER_NOT_FOUND'

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
export const LoginDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Login' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'status' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const RegisterDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Register' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'displayName' }
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
				},
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
						name: { kind: 'Name', value: 'register' },
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
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'displayName' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'displayName' }
								}
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'status' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>
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
								},
								{
									kind: 'InlineFragment',
									typeCondition: {
										kind: 'NamedType',
										name: { kind: 'Name', value: 'LoginResult' }
									},
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'status' } }
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
