import { songFragment } from '@/graphql/queries/song-fragment'
import gql from 'graphql-tag'

export const allSongsQuery = gql`
	query AllSongs {
		allSongs {
			...Song
		}
	}

	${songFragment}
`
