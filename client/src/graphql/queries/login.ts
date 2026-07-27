import gql from 'graphql-tag'

export const loginMutation = gql`
	mutation Login($password: String!, $username: String!) {
		login(password: $password, username: $username) {
			status
			token
		}
	}
`
