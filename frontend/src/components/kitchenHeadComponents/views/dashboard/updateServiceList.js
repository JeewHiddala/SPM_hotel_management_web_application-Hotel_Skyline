import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


const initialState = {
    customerServices: [],
    createdDate: '',
    total: '',
    id: ''


}

class updateServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        
        this.updateServiceList = this.updateServiceList.bind(this);


        this.backtoServiceListBillManagementDash = this.backtoServiceListBillManagementDash.bind(this);
    }

    componentDidMount() {
        const data = this.props.match.params.id;
        console.log("rrrr" + data);

        axios.get(`http://localhost:8100/serviceList/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ createdDate: response.data.data.createdDate });
                this.setState({ total: response.data.data.customerServices[0].cost });
                this.setState({ customerServices: response.data.data.customerServices });

                console.log("mtttmm", response.data.data.customerServices[0].cost);
            })
            .catch(error => {
                alert(error.message)
            })
    }

    updateServiceList(e, serviceListId) {
        window.location = `/update-CustomerService/${serviceListId}`
    }

    backtoServiceListBillManagementDash(e) {
        window.location = '/create-serviceListBill'
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }




    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. 
        let serviceList = {
            createdDate: this.state.createdDate,
            total: this.state.total,
            customerServices: this.state.customerServices,
        }
        console.log('DATA TO SEND', serviceList);

        axios.patch(`http://localhost:8100/serviceList/update/${this.state.id}`, serviceList)
            .then(response => {
                // alert('Food Data successfully updated')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated service List details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {

        console.log("cus services" + this.state.customerServices)

        return (
            <div className="row justify-content-center" id="dash-food">
                <div className="container-dash">
                    <h2><b>Receptionist Dashboard</b></h2>
                    <div className="row justify-content-evenly">
                        <div className="col-3 align-self-stretch">

                            <div className="row">
                                <div className="container" >
                                    <h3 className="h3"><b>Creations</b></h3>
                                    <div className="list-group">
                                        <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                        <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                            Room Booking Management
                                        </button></a>
                                        <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                        <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                        <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                        <a href="/create-serviceListBill" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Service List Bill</button></a>
                                        <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <br /><br /><br /><br />
                        </div>
                        <div className="col-8 align-self-stretch">

                            <div className="container"></div>

                            <h2>Edit Customer Service Details</h2>
                            <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                            </h5>

                            <form onSubmit={this.onSubmit} >

                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="createdDate" className="form-label">Created Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="createdDate"
                                                name="createdDate"
                                                value={this.state.createdDate}
                                                disabled
                                                onChange={this.onChange}

                                            />
                                        </div>
                                    </div>
                                    <br />

                                    <br></br>

                                    <h5><p><b>Customer Service List</b></p></h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Service Name</th>
                                                    <th>Used Date</th>
                                                    <th>No of Hours</th>
                                                    <th>Price/Hours</th>
                                                    <th>Cost</th>
                                                    <th></th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.customerServices.length > 0 && this.state.customerServices.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.serviceName.name}</td>
                                                        <td>{item.date}</td>
                                                        <td>{item.noOfHours}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.cost}</td>

                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.updateServiceList(e, item._id)}>Update</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <br></br>
                                    <div className="col-6">
                                        <label htmlFor="total" className="form-label">Service Total</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="total"
                                            name="total"
                                            value={this.state.total}
                                            disabled
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    <br></br>
                                    <br></br>
                                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoServiceListBillManagementDash(e)}>Back</button>
                                    <button type="submit" id="form-button" className="btn btn-warning" >Update Customer Service </button>

                                </div>
                                <br>
                                </br>
                                <br></br>
                                <br></br>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default updateServiceList;