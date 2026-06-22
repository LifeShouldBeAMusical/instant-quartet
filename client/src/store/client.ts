import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache
} from '@apollo/client/core'

const cache = new InMemoryCache()
const cloudLink = ApolloLink.from([
	new HttpLink({ uri: 'http://poseidon:8000/graphql' })
])

export const apolloClient = new ApolloClient({ cache, link: cloudLink })
