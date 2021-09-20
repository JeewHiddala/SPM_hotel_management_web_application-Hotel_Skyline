import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import ReactPaginate from 'react-paginate';

class SalaryManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownClicked: false,
            employees:[],
            cummulativeTotalSalary:'',
            employeeCount:0,
            categories:[]
        }

        this.dropdown = this.dropdown.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.back = this.back.bind(this);
    }

    componentDidMount() {   //inbuild function
        axios.get('http://localhost:8100/employee/totalWorkingEmployeeSalary/')
            .then(response => {
                //console.log(response.data.totalAmount)
                this.setState({ cummulativeTotalSalary: response.data.cummulativeTotalSalary })
                console.log("qwer",response.data.cummulativeTotalSalary)
                this.setState({ employeeCount: response.data.employeeCount })              
                this.setState({ employees: response.data.employees }, () => {
                    let hashMap = new Map();
                    this.state.employees.map((item, index) => {
                        if (!hashMap.has(item.position)) {
                            let salary = parseFloat(item.salary);
                            let count = 1;
                            let emp ={
                                totSalary: salary,
                                count: count
                            }
                            hashMap.set(item.position, emp)
                            console.log("swwwdeds", emp)
                        } else {
                            let totsalary = hashMap.get(item.position).totSalary;
                            totsalary += parseFloat(item.salary);
                            let count = hashMap.get(item.position).count + 1;
                            let emp ={
                                totSalary: totsalary,
                                count: count
                            }
                            hashMap.set(item.position, emp)
                        }

                        return 0;
                    });
                    let data1 = [];
                    hashMap.forEach((key, value) => {
                        let proportion = (parseFloat(key.totSalary)/parseFloat(this.state.cummulativeTotalSalary)) * 100;
                        let employees1 = {
                            count: key.count,
                            proportion: proportion,
                            totSalary:key.totSalary,
                            key: value
                        }
                        data1.push(employees1)

                    });
                    //this.setState({ catg: value });
                    this.setState({ categories: data1 });
                    console.log("swws", hashMap)
                })


            })
            
            
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }



    dropdown(e) {
        this.setState(prevState => ({
            isDropdownClicked: !prevState.isDropdownClicked
        }))
    }

    render() {
        const { isDropdownClicked } = this.state;
        console.log("categ", this.state.categories)
        return (
            <div>
                <br /><br />
                <br />
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h5><b className="sub-topic">Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action" data-bs-toggle="dropdown" aria-expanded="false" onClick={e => this.dropdown(e)}>
                                                Employee Management
                                            </button>
                                            {isDropdownClicked && (
                                                <div>
                                                    <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                                    <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
                                                </div>
                                            )}

                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service Management</button></a>
                                        </div>
                                        <br></br>
                                        <h5><b className="sub-topic">Monitoring</b></h5>
                                        <div className="list-group">
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Service Bills</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                                View Booking Bills
                                            </button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Ingredient Ordering</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendence</button></a>
                                            <a href="/salaryManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" id="active-button" aria-current="true">Salary Management</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Price Lists</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="col-4">
                                        <h4 className="topic"><b>Salary Management</b></h4>
                                    </div><br/>
                                    <div className="container" > 
                                        <div className="col-6" id="workemprep">
                                            <h5><b>Working Employee Count : {this.state.employeeCount}</b></h5>
                                        </div><br/>
                                        <div className="col-6" id="workemprep">
                                            <h5><b>Total Salary to Pay : {this.state.cummulativeTotalSalary}</b></h5>
                                        </div><br/>
                                        <div><b>Administrative Employee Salary Proportion</b></div><br/>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col">Position</th>                                                    
                                                        <th scope="col">Positionally Working Employee Count</th>
                                                        <th scope="col">Cummulative Total Salary</th>
                                                        <th scope="col">Position Proportion Precentage</th>
                                                        <th scope="col">Financially Prediction</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.categories.length > 0 && this.state.categories.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.key}</td>
                                                            <td>{item.count}</td>
                                                            <td>{item.totSalary}</td>
                                                            <td>{item.proportion.toFixed(2)} %</td>
                                                            <td>{item.proportion.toFixed(2) <= 28
                                                                    ? <div><span className="badge bg-success"> Normal Level </span></div>
                                                                    : <div><span className="badge bg-danger"> Critical Level </span></div>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                    <div className= "generateReportbtn">
                                        <button type="button" className="btn btn-dark">Generate Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>






                <br /><br /><br /><br />
                <br /><br /><br /><br />
            </div>
        )
    }
}

export default SalaryManagement;