import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache
} from '@apollo/client/core'

const cache = new InMemoryCache()
const cloudLink = ApolloLink.from([
	new HttpLink({ uri: 'http://192.168.0.216:8000/graphql' })
])

export const apolloClient = new ApolloClient({ cache, link: cloudLink })
