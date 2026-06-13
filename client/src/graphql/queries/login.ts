import gql from 'graphql-tag'

export const loginMutation = gql`
	mutation LogIn($password: String!, $username: String!) {
		login(password: $password, username: $username) {
			token
		}
	}
`
