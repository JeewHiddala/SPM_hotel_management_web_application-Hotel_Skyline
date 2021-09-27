const EmployeeLeave = require('../models/employeeLeaves.model');       //import employee model
const mongoose = require("mongoose");

const createEmployeeLeaves = async (req, res) => {       //create a employee to db.
    if (req.body) {
        const employeeLeaves = new EmployeeLeave(req.body);
        employeeLeaves.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllEmployeesLeavesDetails = async (req, res) => {       //get all working employee details.
    let page = req.query.page; 
    var emplev = [{ path: 'receptionistName', select: 'name' }, { path: 'employeeNIC', select: 'nicNo' }];
    const options = {
        page: page,
        populate: emplev,
        limit: 5
      }
    await EmployeeLeave.paginate({},options)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSearchedEmployeeLeavesDetailsByNIC = async (req, res) => {          //get selected search details. //search
    var nicNo = req.params.nicNo;
    await EmployeeLeave.find({employeeNIC: nicNo})
        .populate('receptionistName', 'name')
        .populate('employeeNIC', 'nicNo')
        .then(data => {
            res.status(200).send({ data: data });
            console.log("444 "+nicNo);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const deleteEmployeeLeaves = async (req, res) => {               // delete selected employee.
    if (req.params && req.params.id) {
        const {id} = req.params;            // fetching the id of the employee
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employee with id: ${id}`);       //validating the employee id.
        await EmployeeLeave.findByIdAndRemove(id);         // find employee and remove employee.
        res.json({message: "Employee deleted successfully."});
    }
}

const updateSelectedEmployeeLeavesDetails = async (req, res) => {       //update selected editor
    if (req.params && req.params.id){
        const {id} = req.params;        // fetching the id of the editor.
        const employeeLeaves = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No employee With That id');      // validating the employee id
        const updatedemployeeLeaves = await EmployeeLeave.findByIdAndUpdate(id, employeeLeaves,{new : true});      // find employee and employee editor
        res.json(updatedemployeeLeaves);
    }
}

module.exports = {
    createEmployeeLeaves,
    getAllEmployeesLeavesDetails,
    getSearchedEmployeeLeavesDetailsByNIC,
    updateSelectedEmployeeLeavesDetails,
    deleteEmployeeLeaves
};