import apolloClient from './apollo-client';
import { AccountsClient } from '@accounts/client';
import GraphQLClient from '@accounts/graphql-client';
import {gql} from '@apollo/client';


const accountsGraphQL = new GraphQLClient({
    graphQLClient: apolloClient,
    userFieldsFragment: gql`
    fragment userFields on User {
      id
      emails {
        address
        verified
      }
      profile{
        name
        lastName
      }
    }
  `,
});
const accountsClient = new AccountsClient({}, accountsGraphQL);

export { accountsClient, accountsGraphQL};