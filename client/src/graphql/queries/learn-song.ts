import { songFragment } from '@/graphql/queries/song-fragment'
import { gql } from 'graphql-tag'

export const learnSongMutation = gql`
	mutation LearnSong(
		$songInput: SongInput!
		$token: String!
		$voicePart: VoicePart!
	) {
		learnSong(songInput: $songInput, token: $token, voicePart: $voicePart) {
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
