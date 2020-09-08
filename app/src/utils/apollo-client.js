// import ApolloClient from 'apollo-boost';
import { accountsLink } from '@accounts/apollo-link';
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import {accountsClient} from './accounts-js';
// const client = new ApolloClient({
//     uri: 'http://localhost:3001/graphql',
// });

const authLink = accountsLink(() => accountsClient);

const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
});
export default client