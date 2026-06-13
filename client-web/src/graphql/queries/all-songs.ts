import gql from 'graphql-tag'

export const allSongsQuery = gql`
	query AllSongs {
		allSongs {
			id
			title
			voicing
			stockId
		}
	}
`
