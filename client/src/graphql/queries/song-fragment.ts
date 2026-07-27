import gql from 'graphql-tag'

export const songFragment = gql`
	fragment Song on Song {
		id
		title
		stockId
		voicing
		contributors {
			...ContributorXref
		}
	}

	fragment ContributorXref on Contributor {
		contributionType
		contributorName
	}
`
