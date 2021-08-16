const Employee = require('../models/employee.model');       //import employee model
const mongoose = require("mongoose");

const createEmployee = async (req, res) => {       //create a employee to db.
    if (req.body) {
        const employee = new Employee(req.body);
        employee.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllEmployeesDetails = async (req, res) => {       //get all employee details.
    await Employee.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllWorkingEmployeesDetails = async (req, res) => {       //get all working employee details.
    await Employee.find({isWorking:true})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllRetiredEmployeesDetails = async (req, res) => {       //get all retired employee details.
    await Employee.find({isWorking:false})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSelectedEmployeeDetails = async (req, res) => {          //get selected employee details.
    if (req.params && req.params.id) {
        await Employee.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteEmployee = async (req, res) => {               // delete selected employee.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the employee
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);       //validating the employee id.
        await Employee.findByIdAndRemove(id);         // find employee and remove employee.
        res.json({message: "Employee deleted successfully."});
    }
}

module.exports = {
    createEmployee,
    getAllEmployeesDetails,
    getAllWorkingEmployeesDetails,
    getAllRetiredEmployeesDetails,
    getSelectedEmployeeDetails,
    deleteEmployee
};