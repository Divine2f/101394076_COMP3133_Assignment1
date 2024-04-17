const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');
const User = require('../models/User');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    register: {
      type: userType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { username, email, password }) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('Email already exists');
        }

        const user = new User({ username, email, password });
        await user.save();
        return user;
      },
    },
  }),
});

const schema = new GraphQLSchema({ mutation: mutationType });

module.exports = schema;
