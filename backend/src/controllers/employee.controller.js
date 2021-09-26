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
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Employee.paginate({isWorking:true},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getAllRetiredEmployeesDetails = async (req, res) => {       //get all retired employee details.
    let page = req.query.page; 
    const options = {
        page: page,
        limit: 5
      }
    await Employee.paginate({isWorking:false},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllWorkingChefsDetails = async (req, res) => {       //get all chef details.
    await Employee.find({isWorking:true,position:"Chef"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllWorkingReceptionistsDetails = async (req, res) => {       //get all chef details.
    await Employee.find({isWorking:true,position:"Receptionist"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllWorkingEmployeesSalaryCount = async (req, res) => {       //get all Working Employees Salary Count
    await Employee.find({isWorking:true})
        .then(data => {
            let totalsalary = 0;
            for(var i=0; i < data.length; i++){
                totalsalary += parseFloat(data[i].salary);
            }
            console.log("totsal", totalsalary)
            res.status(200).send({ cummulativeTotalSalary: totalsalary, employeeCount: data.length, employees: data});
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getAllWorkingChefDetails = async (req, res) => {       //get all working employee details.
    await Employee.find({isWorking:true, position:"Chef"})
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

const getEmployeeDetails = async (req, res) => {       //get employee details 
    var userData = req.params.userData;
    await Employee.findOne({userData: userData})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });

}

const getSearchedEmployeeDetailsByNIC = async (req, res) => {          //get selected search details. //search
    var nicNo = req.params.nicNo;
    await Employee.findOne({nicNo: nicNo})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSearchedRetiredEmployeeDetailsByNIC = async (req, res) => {          //get selected search retired employee details. //search
    var nicNo = req.params.nicNo;
    await Employee.findOne({$and: [{isWorking:false},{nicNo: nicNo}]})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const updateEmployeeProfile = async (req, res) => {       //update selected employee
    if (req.params && req.params.id) {
        const { id } = req.params;        // fetching the employee id 
        const employee = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No employee With that id');      // validating the employee id
        const updatedemployee = await Employee.findByIdAndUpdate(id, {$set: {
            name: employee.name,
            mobileNumber: employee.mobileNumber,
            email: employee.email,
            password: employee.password
        }});      // find and update employee
        res.json(updatedemployee);
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

const resignSelectedEmployee = async (req, res) => {       //retire selected employee
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the employee.
        const employee = req.body.isWorking;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No employee With That id');      // validating the employee id
        const resignEmployee = await Employee.findByIdAndUpdate(id, {$set: {"isWorking":false}});      // find employee and Update employee
        res.json(resignEmployee);
    }
}

const updateSelectedEmployeeDetails = async (req, res) => {       //update selected editor
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the editor.
        const employee = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No employee With That id');      // validating the employee id
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employee,{new : true});      // find employee and employee editor
        res.json(updatedEmployee);
    }
}

module.exports = {
    createEmployee,
    getAllEmployeesDetails,
    getAllWorkingEmployeesDetails,
    getAllRetiredEmployeesDetails,
    getAllWorkingChefDetails,
    getAllWorkingEmployeesSalaryCount,
    getSelectedEmployeeDetails,
    getSearchedEmployeeDetailsByNIC,
    getSearchedRetiredEmployeeDetailsByNIC,
    deleteEmployee,
    getAllWorkingChefsDetails,
    getAllWorkingReceptionistsDetails,
    resignSelectedEmployee,
    updateSelectedEmployeeDetails,
    updateEmployeeProfile,
    getEmployeeDetails
};