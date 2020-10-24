const express = require("express");
const expressGraphQL = require("express-graphql");

const app = express();

app.use("/graphql", expressGraphQL.graphqlHTTP({ graphiql: true }));

app.listen(4000, () => {
  console.log("listening to http://localhost:4000/graphql");
});
