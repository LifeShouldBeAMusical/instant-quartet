import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache
} from '@apollo/client/core'

const cache = new InMemoryCache()
const cloudLink = ApolloLink.from([
	new HttpLink({ uri: 'https://instant-quartet-server.onrender.com/graphql' })
])

export const apolloClient = new ApolloClient({ cache, link: cloudLink })
