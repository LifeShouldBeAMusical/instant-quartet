import { songFragment } from '@/graphql/queries/song-fragment'
import gql from 'graphql-tag'

export const mySongsQuery = gql`
	query MySongs($token: String!) {
		mySongs(token: $token) {
			... on SongList {
				songs {
					...MySong
				}
			}
			... on LoginResult {
				status
			}
		}
	}

	fragment MySong on SongListItem {
		parts
		song {
			...Song
		}
	}

	${songFragment}
`
