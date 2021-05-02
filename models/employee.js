const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    "fname": {
      "type": "String"
    },
    "lname": {
      "type": "String"
    },
    "department": {
      "type": "String"
    },
    "age": {
      "type": "Number"
    },
    "salary": {
      "type": "Number"
    }
  })

module.exports = mongoose.model('Employee', employeeSchema)
