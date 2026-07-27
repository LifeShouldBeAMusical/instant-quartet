import gql from 'graphql-tag'

export const registerMutation = gql`
	mutation Register(
		$displayName: String
		$password: String!
		$username: String!
	) {
		register(
			password: $password
			username: $username
			displayName: $displayName
		) {
			status
			token
		}
	}
`
