import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
    // eslint-disable-next-line no-console
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: '/api/graphql',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/graphql`,
});
