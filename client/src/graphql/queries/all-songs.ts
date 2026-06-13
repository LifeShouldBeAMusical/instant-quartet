import gql from 'graphql-tag'

export const allSongsQuery = gql`
	query AllSongs {
		allSongs {
			...Song
		}
	}

	fragment Song on Song {
		id
		title
		stockId
		voicing
	}
`
