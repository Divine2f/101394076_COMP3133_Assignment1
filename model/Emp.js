const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
});

// Create the Employee model
const Emp = mongoose.model('Employee', employeeSchema);

module.exports = Emp;
