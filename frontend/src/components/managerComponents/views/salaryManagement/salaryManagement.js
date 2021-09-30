import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import ReactPaginate from 'react-paginate';
import jsPDF from "jspdf";
import "jspdf-autotable";
import reportImage from '../../../../images/logo.jpg';

class SalaryManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownClicked: false,
            employees: [],
            cummulativeTotalSalary: '',
            employeeCount: 0,
            id: '',
            categories: []
        }

        this.dropdown = this.dropdown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.exportSalaryReportPDF = this.exportSalaryReportPDF.bind(this);
        // this.back = this.back.bind(this);
    }

    componentDidMount() {   //inbuild function
        axios.get('http://localhost:8100/employee/totalWorkingEmployeeSalary/')
            .then(response => {
                //console.log(response.data.totalAmount)
                this.setState({ cummulativeTotalSalary: response.data.cummulativeTotalSalary })
                console.log("qwer", response.data.cummulativeTotalSalary)
                this.setState({ employeeCount: response.data.employeeCount })
                this.setState({ employees: response.data.employees }, () => {
                    let hashMap = new Map();
                    this.state.employees.map((item, index) => {
                        if (!hashMap.has(item.position)) {
                            let salary = parseFloat(item.salary);
                            let count = 1;
                            let emp = {
                                totSalary: salary,
                                count: count
                            }
                            hashMap.set(item.position, emp)
                            console.log("swwwdeds", emp)
                        } else {
                            let totsalary = hashMap.get(item.position).totSalary;
                            totsalary += parseFloat(item.salary);
                            let count = hashMap.get(item.position).count + 1;
                            let emp = {
                                totSalary: totsalary,
                                count: count
                            }
                            hashMap.set(item.position, emp)
                        }

                        return 0;
                    });
                    let data1 = [];
                    hashMap.forEach((key, value) => {
                        let proportion = (parseFloat(key.totSalary) / parseFloat(this.state.cummulativeTotalSalary)) * 100;
                        let employees1 = {
                            count: key.count,
                            proportion: proportion,
                            totSalary: key.totSalary,
                            key: value
                        }
                        data1.push(employees1)

                    });
                    this.setState({ categories: data1 });
                    console.log("swws", hashMap)
                })


            })


    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    exportSalaryReportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);

        var reportImg = new Image;
        reportImg.src = reportImage;

        const title = "Salary Management Report";
        const headers = [["Position", "Positionally Working Employee Count", "Cummulative Total Salary", "Position Proportion Precentage (%)", "Financially Prediction"]];
        const headers1 =[["Total Working Employee Count", "Total Salary Expenses"]];

        const data = [];
        this.state.categories.map((item, index) => {
            let level = "";
            if (item.proportion.toFixed(2) <= 28) {
                level = "Normal Level"
            } else {
                level = "Critical Level"
            }
            let category1 = [
                item.key,
                item.count,
                item.totSalary,
                item.proportion.toFixed(2),
                level
            ]
            data.push(category1)
        });

        let employeeCount = this.state.employeeCount;
        let cummulativeTotalSalary = this.state.cummulativeTotalSalary;

        const data1 = [[employeeCount, cummulativeTotalSalary]]

        let content = {
            startY: 122,
            head: headers,
            body: data
        };

        doc.setFontSize(13);
        doc.addImage(reportImg, 'JPEG', 40, 13, 70, 70);
        doc.text("Skylight Hotel", marginLeft+80, 25);

        doc.setFontSize(11);
        doc.text("No.2 Main Street, Colombo", marginLeft+80, 40);
        doc.text("info@skylight.com", marginLeft+80, 55);
        doc.text("+94 255 255 111", marginLeft+80, 70);

        doc.line(40, 93, 558, 93);          //upper line
        doc.line(40, 780, 558, 780);          //bottom line

        doc.text(title, marginLeft, 110);
        doc.autoTable(content);

        let finalY = doc.previousAutoTable.finalY;

        let content1 = {
            startY: finalY+10,
            head: headers1,
            body: data1
        };
        doc.autoTable(content1);
        doc.setFontSize(10);
        let marginTop = doc.previousAutoTable.finalY + 25;
        var today = new Date();
        var newdate = "Report Issued : " + today;
        doc.text(marginLeft, marginTop, newdate);
        doc.text("*** Disclaimer : This is an electronically generated report, hence does not require signature.", marginLeft, marginTop+20);
        doc.save("Salary Management Report - Hotel SkyLight.pdf");
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
                        <h3><b className="super-topic">Manager Dashboard</b></h3>
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
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Service Bills</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                                View Booking Bills
                                            </button></a>
                                            <a href="/kitchenHeadDashboard" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Ingredient Ordering</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendence</button></a>
                                            <a href="/salaryManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Salary Management</button></a>
                                            <a href="/create-foodManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Price Lists</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="col-4">
                                        <h4 className="topic"><b>Salary Management</b></h4>
                                    </div><br />
                                    <div className="container" >
                                        <div className="col-6" id="workemprep">
                                            <h5><b>Working Employee Count : {this.state.employeeCount}</b></h5>
                                        </div><br />
                                        <div className="col-6" id="workemprep">
                                            <h5><b>Total Salary to Pay : {this.state.cummulativeTotalSalary}</b></h5>
                                        </div><br />
                                        <div><b>Administrative Employee Salary Proportion</b></div><br />
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
                                                    <tr>
                                                        <td colSpan="1" className="table-dark">Total Working Employee Count</td>
                                                        <td colSpan="4">{this.state.employeeCount}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-dark" colSpan="2">Total Salary Expenses</td>
                                                        <td colSpan="3">{this.state.cummulativeTotalSalary}</td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                    <div className="generateReportbtn">
                                        <button type="button" className="btn btn-dark" onClick={() => this.exportSalaryReportPDF()}>Generate Report</button>
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