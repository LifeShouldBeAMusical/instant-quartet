import { gql } from 'graphql-tag'

export const userInfoQuery = gql`
	query UserInfo($token: String!) {
		shareInfo(token: $token) {
			... on ShareInfo {
				...ShareInfo
			}
			... on LoginResult {
				status
			}
		}
	}

	fragment ShareInfo on ShareInfo {
		displayName
		username
	}
`
