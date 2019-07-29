import ApolloClient, { gql } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql'
});

export const LevelsQuery = gql`
  query {
    levels {
      title
      colors
      solution
    }
  }
`;