const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// MongoDB connection
const uri = 'mongodb+srv://divine2f@gmail.com:Hesoyam2f!@cluster0.j4eg6qz.mongodb.net/101394076_COMP3133_Assignment1?retryWrites=true&w=majority';

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
        employee(id: String!): Employee
        employees: [Employee!]!
    }

    type Mutation {
        signup(username: String!, email: String!,  password: String!): User
        createEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: String!): Employee
        updateEmployee(id: String!, input: UpdateEmployeeInput!): Employee
        deleteEmployee(id: String!): String
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);

// MongoDB Models
const User = require('./model/User');
const Emp = require('./model/Emp');

// GraphQL Resolvers
const resolvers = {
    Query: {
        user: async (root, args) => await User.findById(args.id),
        employee: async (root, args) => await Emp.findById(args.id),
        employees: () => Employee.find().sort({ last_name: 1 }) // sort by last name in ascending order
    },
    Mutation: {
        signup: (_, args) => User.create(args),
        createEmployee: (_, args) => Emp.create(args),
        updateEmployee: async (_, args) => {
            const updatedEmp = await Emp.findByIdAndUpdate(args.id, { ...args.input }, { new: true });
            if (!updatedEmp) throw new Error('Employee not found');
            return updatedEmp;
        },
        deleteEmployee: async (_, args) => {
            const res = await Emp.deleteOne({ _id: args.id });
            if (res.deletedCount === 0) throw new Error('Employee not found');
            return 'Employee deleted successfully';
        }
    }
};

// Express Server Setup
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(4000, () => console.log('Server is running at http://localhost:4000/graphql'));
