import { songFragment } from '@/graphql/queries/song-fragment'
import { gql } from 'graphql-tag'

export const learnSongMutation = gql`
	mutation LearnSong($songInput: SongIdentifier!, $learned: LearnSongInput) {
		learnSong(songInput: $songInput, learned: $learned) {
			... on LearnSongResult {
				__typename
				status
				song {
					...Song
				}
			}
		}
	}

	${songFragment}
`
