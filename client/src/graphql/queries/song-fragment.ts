import gql from 'graphql-tag'

export const songFragment = gql`
	fragment Song on Song {
		id
		title
		stockId
		voicing
		contributors {
			id
			contributionType
			contributorName
		}
	}
`
