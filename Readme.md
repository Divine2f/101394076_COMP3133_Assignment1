#COMP3133 Assignment 1: Backend Application#

Welcome to the COMP3133 Assignment 1 repository! This project involves developing a Backend application using Node.js, Express, GraphQL, and MongoDB. Below, you'll find details about the project requirements, methods, database structure, and instructions on how to contribute.

Project Requirements
This project aims to create a Backend application with the following functionalities:

Signup: Allow users to create a new account.
Login: Enable user access to the system.
Get all employees: Users can retrieve a list of all employees.
Add New employee: Users can create a new employee profile.
Search employee by eid: Users can find employee details by employee ID.
Update employee by eid: Users can update employee details.
Delete employee by eid: Users can delete an employee by employee ID.
Technologies Used
Node.js
Express
GraphQL
MongoDB
GitHub (Version Control System)
Getting Started
To contribute to this project, follow these steps:


###Clone the repository to your local machine:###
bash
Copy code
git clone https://github.com/Divine2f/101394076_COMP3133_Assignment1.git
Install dependencies:

###Copy code###
npm install
Start the development server:

###sql###
Copy code
npm start
Test the GraphQL API using GraphiQL or Postman.

###Database Structure###
Users Collection
username: String (Primary Key)
email: String (Unique)
password: String (May be encrypted with other fields)
Employee Collection
first_name: String (Required)
last_name: String (Required)
email: String (Unique)
gender: String (Male/Female/Other)
salary: Float (Required)
Additional Notes
Implement GraphQL API using Apollo server.
Validate input data whenever required.
Return error details or success response details whenever necessary.
All data must be sent back and forth in JSON Object format.
Optionally apply JWT security concept to secure all API calls.
No late submissions accepted.

###Contributors###
Divine Iyalla Falola - Junior Software Engineer
