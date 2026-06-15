import { songFragment } from '@/graphql/queries/song-fragment'
import gql from 'graphql-tag'

export const sharedSongsQuery = gql`
	query SharedSongs($token: String!, $usernames: [String!]!) {
		sharedSongs(token: $token, usernames: $usernames) {
			... on SharedSongList {
				__typename
				songs {
					distinctUserCount
					distinctUsers
					song {
						...Song
					}
					voiceParts {
						tenor
						lead
						bari
						bass
					}
				}
			}
		}
	}
	${songFragment}
`
