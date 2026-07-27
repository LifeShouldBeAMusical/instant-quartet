import { songFragment } from '@/graphql/queries/song-fragment'
import gql from 'graphql-tag'

export const allSongsQuery = gql`
	query AllSongs($voicing: Voicing) {
		allSongs(voicing: $voicing) {
			...Song
		}
	}

	${songFragment}
`
