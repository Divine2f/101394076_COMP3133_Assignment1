const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const  resolvers   = require('./graphql/resolvers');

const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Employee = require('./models/Employee')

const uri = 'mongodb+srv://divine2f:Hesoyam2f@cluster0.j4eg6qz.mongodb.net/assignment2?retryWrites=true&w=majority&appName=Cluster0';
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));

mongoose.connect(uri, {}).then(() => {
    console.log('Success MongoDB connection');
}).catch(err => {
    console.log('Error MongoDB connection:', err);
});

// GraphQL Schema
const schema = buildSchema(`

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type UserData {
        token: String!
        user: User!
    }

    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: String!
    }

    input UpdateEmployeeInput {
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: String
    }


    type Query {
        user(id: String!): User
        login(email: String!, password: String!): UserData
        employee(id: String!) : Employee 
        employees: [Employee!]!
    }

    type Mutation {
        signup(username: String!, email: String!,  password: String!): User
        createEmployee(first_name: String!, last_name: String!, email: String!, gender: String! ,salary: String!): Employee
        updateEmployee(id: String!, input: UpdateEmployeeInput!): Employee
        deleteEmployee(id: String!) : String
    }

    schema {
        query: Query
        mutation: Mutation
      }
`);


const root = {
    signup: async ({ username, email, password }) => {
      try {
        // Save user data to MongoDB
        const newUser = new User({ username, email, password });
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },

    login: async ({  email, password }) => { 
        try {

            // Find user by email
            const user = await User.findOne({ email });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

            return { token, user };
            }

            // Check if password is correct
          
            
        } catch (error) {
            throw new Error('Failed to login');
        }
    },

    employees: async () => {
        try {
                const EmployeesFetch = await Employee.find();
                return EmployeesFetch;
             } catch (error) {
                throw error 
             }
    }, 
    createEmployee: async ({ first_name, last_name, email, gender, salary }) => {
        try {
          const newEmployee = new Employee({ first_name, last_name, email, gender, salary });
          await newEmployee.save();
          return newEmployee;
        } catch (error) {
          throw new Error('Failed to create employee');
        }
      },

      updateEmployee: async ({ id, input }) => {
        try {
          const updatedEmployee = await Employee.findByIdAndUpdate(id, input, { new: true });
          if (!updatedEmployee) {
            throw new Error('Employee not found');
          }
          return updatedEmployee;
        } catch (error) {
          throw new Error('Failed to update employee');
        }
      },
    
      deleteEmployee: async ({ id }) => {
        try {
          const deletedEmployee = await Employee.findByIdAndDelete(id);
          if (!deletedEmployee) {
            throw new Error('Employee not found');
          }
          return 'Employee deleted successfully';
        } catch (error) {
          throw new Error('Failed to delete employee');
        }
      }
    
  };

// Express Server Setup

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root, 
    graphiql: true
}));

// Start the server on port 4000
app.listen(4000, () => console.log("Server is running at http://localhost:4000/graphql"));
