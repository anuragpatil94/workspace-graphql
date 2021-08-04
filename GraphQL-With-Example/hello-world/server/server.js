const { gql } = require("apollo-server");

// GraphQL Schema Example
const typeDefs = gql`
  type Query {
    greeting: String
  }
`;
