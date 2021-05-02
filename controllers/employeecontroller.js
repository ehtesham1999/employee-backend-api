const Employee = require('../models/employee')
module.exports = {
    getAllEmployees : async (req, res) => {
        try {
          const employees = await Employee.find()
          console.log(employees)
          res.status(201).json(employees)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      },

    addEmployee : async (req, res ) => {

        const employee = new Employee({
          fname: req.body.fname,
          lname: req.body.lname,
          department: req.body.department ,
          age: req.body.age,
          salary: req.body.salary
        })
        try {
          const newEmployee = await employee.save()
          res.status(201).json(newEmployee)
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      },
    
    updateEmployee : async (req, res) => {
        if (req.body.fname != null) {
          res.employee.fname = req.body.fname
        }
        if (req.body.lname != null) {
          res.employee.lname = req.body.lname
        }
        if (req.body.department != null) {
          res.employee.department = req.body.department
        }
        if (req.body.age != null) {
          res.employee.age = req.body.age
        }
        try {
          const updatedEmployee = await res.employee.save()
          res.status(200).json(updatedEmployee)
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      },

    deleteEmployee : async (req, res) => {
        try {
          await res.employee.remove()
          res.status(200).json({ message: 'Deleted Employee' })
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      },

    age_gte : async(req, res) => {
        try {
            const employees_age = await Employee.aggregate([{ $match: { age: { $gte: parseInt(req.params.age) }}}])
            console.log(employees_age)
            res.json(employees_age)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    },

    age_lte : async(req, res) => {
        try {
            const employees_age = await Employee.aggregate([{ $match: { age: { $lte: parseInt(req.params.age) }}}])
            console.log(employees_age)
            res.json(employees_age)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    },

    findByDept : async(req, res) => {
        try {
            const employees_dept = await Employee.aggregate([{ $match: { department: req.params.dept } }])
            console.log(employees_dept)
            res.status(201).json(employees_dept)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    },

    avgAgeByDept : async(req, res) => {
        try {
            const employees_avg_age = await Employee.aggregate([
                {
                  $group:
                    {
                      _id: "$department",
                      avgAge: { $avg: "$age" }
                    }
                },
                {$sort : {avgAge: 1}}
              ])
            
            console.log(employees_avg_age)
            res.status(201).json(employees_avg_age)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    },

    avgSalByDept : async(req, res) => {
        try {
            const employees_avg_sal = await Employee.aggregate([
                {
                  $group:
                    {
                      _id: "$department",
                      avgSal: { $avg: "$salary" }
                    }
                },
                {
                    $sort: {avgSal:1}
                }
              ])
            
            console.log(employees_avg_sal)
            res.status(200).json(employees_avg_sal)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
        
    },

    getEmployee : async(req, res, next) =>{
        let employee
        try {
          employee = await Employee.findById(req.params.id)
          if (employee == null) {
            return res.status(404).json({ message: 'Cannot find Employee' })
          }
        } catch (err) {
          return res.status(500).json({ message: err.message })
        }
      
        res.employee = employee
        next()
      }



    

    

    
}