const { gql, ApolloServer } = require("apollo-server");

// GraphQL Schema Example
/*
  # Query
  query {
    greeting
  }

  # result 
  {
    "data": {
      "greeting": "Hello World!"
    }
  }
 */
const typeDefs = gql`
  # Hidden Step
  # This <query> matches the <query> operation when writing query in graphiql
  schema {
    query: Query
  }

  ###########
  type Query {
    greeting: String
  }
`;

/** to check how server returns greeting value
 * The `Query` property in resolvers resembles the `Query` property in typeDefs
 * The `greeting` property in resolvers resembles the `greeting` property in typeDefs
 * the typeDefs only will define the type of the property where as resolver will return actual value
 */
const resolvers = {
  Query: {
    greeting: () => "Hello World!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at URL:${url}`));
