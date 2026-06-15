import gql from 'graphql-tag'

export const songFragment = gql`
	fragment Song on Song {
		id
		title
		stockId
		voicing
		contributors {
			...Contributor
		}
	}

	fragment Contributor on Contributor {
		id
		contributionType
		contributorName
	}
`
