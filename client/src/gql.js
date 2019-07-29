import ApolloClient, { gql } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql'
});

export const Levels = gql`
  query {
    levels {
      title
      colors
      solution
    }
  }
`;

/*
export const AddLevel = gql`
  mutation addLevel($) {
    add
  }
`;
*/
