const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const AuthService = require("../services/auth");
const UserType = require("./types/user_type");
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, context) {
        // context is request object coming from request
        return AuthService.signup({ email, password, req: context });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
  },
});

module.exports = mutation;
