const graphql = require("graphql");
const mutation = require("./mutations");
const { GraphQLSchema } = graphql;

const RootQueryType = require("./types/root_query_type");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
