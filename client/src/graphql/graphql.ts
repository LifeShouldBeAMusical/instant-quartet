/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
	  }
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type UserInfoQueryVariables = Exact<{
	token: string
}>

export type UserInfoQuery = {
	shareInfo:
		| { displayName: string | null; username: string }
		| Record<PropertyKey, never>
}

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
