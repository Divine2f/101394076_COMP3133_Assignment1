const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      // Logic to fetch user by id from the database
      // Example:
      const user = await User.findById(id);
      return user;
    },
    // Implement other query resolvers here
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      // Logic to create a new user
      // Example:
      const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            
            // Create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            let user = new User({ username, email, password: hashedPassword });
            
            let newUser = await user.save();
            return newUser;
    },
    // Implement other mutation resolvers here
  },
};

module.exports = resolvers;
