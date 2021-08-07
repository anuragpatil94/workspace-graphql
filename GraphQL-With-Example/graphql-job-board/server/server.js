const fs = require("fs");
const { gql, ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);

/**
 * Since the scema is in different fine, we can use gql as function and pass the
 * file name to it. Encoding is set to utf-8, so that it will not be read as
 * binary file.
 */
const typeDefs = gql(
  fs.readFileSync("./schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers");

/**
 * the context here will be available to all the queries in resolvers
 * as the 3rd param. We can put whatever we want in the context.
 */
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
