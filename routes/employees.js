const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const EmployeeController = require('../controllers/employeecontroller')

// Getting all
router.get('/', EmployeeController.getAllEmployees);

// Getting One
router.get('/:id', EmployeeController.getEmployee , (req, res) => {
  res.json(res.employee)
})

// Creating one
router.post('/', EmployeeController.addEmployee)

// Updating One
router.patch('/:id', EmployeeController.getEmployee, EmployeeController.updateEmployee)

// Deleting One
router.delete('/:id', EmployeeController.getEmployee, EmployeeController.deleteEmployee)

//Age greater than 
router.get('/agegte/:age', EmployeeController.age_gte)

//Age less than 
router.get('/agelte/:age', EmployeeController.age_lte )

//Get employees in a dept
router.get('/dept/:dept', EmployeeController.findByDept)

//Find Avg by Age Dept
router.get('/avg/avgage', EmployeeController.avgAgeByDept)

//Find Avg Salary by Dept
router.get('/avg/avgsal', EmployeeController.avgSalByDept)


module.exports = router