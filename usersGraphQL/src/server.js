const express = require("express");
const expressGraphQL = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

app.use("/graphql", expressGraphQL.graphqlHTTP({ graphiql: true, schema }));

app.listen(4000, () => {
  console.log("listening to http://localhost:4000/graphql");
});
