import { gql } from 'graphql-tag'

export const userInfoQuery = gql`
	query UserInfo($token: String!) {
		shareInfo(token: $token) {
			... on ShareInfo {
				displayName
				username
			}
			... on LoginResult {
				status
			}
		}
	}
`
