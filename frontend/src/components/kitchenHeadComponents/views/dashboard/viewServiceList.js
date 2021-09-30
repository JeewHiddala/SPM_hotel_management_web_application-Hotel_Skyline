import React, { Component } from 'react';
import axios from 'axios';

class ViewServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerServices: [],
            createdDate: '',
            total: ''
        }
        this.backtoServiceListManagement = this.backtoServiceListManagement.bind(this);

    }


    backtoServiceListManagement(e) {
        window.location = '/create-serviceListBill'
    }

    componentDidMount() {
        const data = this.props.match.params.id;
        console.log("qwwwww" + data);

        axios.get(`http://localhost:8100/serviceList/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ createdDate: response.data.data.createdDate });
                this.setState({ customerServices: response.data.data.customerServices });
                this.setState({ total: response.data.data.total });

                console.log("data" + response.data.data);
            })

    }

    render() {
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
                            <h2> Service List Details</h2>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.customerServices.length > 0 && this.state.customerServices.map((item, index) => (
                                                    <tr key={index}>

                                                        <td>{item.serviceName.name}</td>
                                                        <th>{item.date}</th>
                                                        <td>{item.noOfHours}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.cost}</td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                    <br />
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
                                    <button type="button" className="btn btn-secondary" onClick={e => this.backtoServiceListManagement(e)}>Back</button>


                                </div>
                                <br>
                                </br>
                                <br></br>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ViewServiceList;