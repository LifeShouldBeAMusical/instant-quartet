import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: 'http://poseidon:8000/graphql',
	documents: ['../client/src/graphql/queries/*.ts'],
	generates: {
		'./src/graphql/': {
			preset: 'client',
			config: {
				useTypeImports: true,
				scalars: { Union: 'number', DateTime: 'Date' }
			},
			presetConfig: { gqlTagName: 'gql' }
		},
		'./src/graphql/types.ts': {
			config: {
				// enumAsTypes: true,
				scalars: { DateTime: 'Date' },
				skipTypename: false
			},
			plugins: [
				// 'typescript',
				'typescript-operations'
			]
		}
	}
}
export default config
