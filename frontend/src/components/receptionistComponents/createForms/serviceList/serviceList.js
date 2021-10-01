import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

const initialState = {
    selectedBookingID: '',
    id: '',
    createdDate: '',
    total: '',
    options1: [],
    bookings: []
}


class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onBookingIDSelect = this.onBookingIDSelect.bind(this);
        this.addService = this.addService.bind(this);
        this.backtoServiceListBillManagementDash = this.backtoServiceListBillManagementDash.bind(this);
    }

    backtoServiceListBillManagementDash(e) {
        window.location = '/create-serviceListBill'
    }
    componentDidMount() {
        axios.get('http://localhost:8100/booking/')
            .then(response => {
                this.setState({ bookings: response.data.data }, () => {
                    let data = [];
                    this.state.bookings.map((item, index) => {
                        let bookings = {
                            value: item._id,
                            label: item.bookingNo
                        }
                        data.push(bookings)
                        console.log("a" + bookings);
                    });
                    this.setState({ options1: data });
                })
            })

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onBookingIDSelect = selectedBookingID => {
        this.setState({ selectedBookingID });
        console.log('Option selected:', selectedBookingID);
    }

    addService(e, bookingNo, id) {
        if ((bookingNo === '')) {
            alert('Please enter booking ID!');

        } else {

            this.props.history.push({
                pathname: `/create-customerService/${id}`,
                data: `${bookingNo}`
            })
        }

    }


    render() {
        const { selectedBookingID } = this.state.selectedBookingID;
        console.log("bid: " + selectedBookingID);
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

                            <h2>Create Customer Service List</h2>
                            <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                            </h5>

                            <form onSubmit={this.onSubmit} >

                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-6">


                                            <label htmlFor="bookingID" className="form-label">Booking Number</label>
                                            <Select
                                                placeholder="Select Booking ID"
                                                name="selectedBookingID"
                                                value={selectedBookingID}
                                                options={this.state.options1}
                                                onChange={this.onBookingIDSelect}
                                                className="basic-single"

                                            />

                                        </div>
                                        <div className="col-6">

                                            <label htmlFor="createdDate" className="form-label">Created Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="createdDate"
                                                name="createdDate"
                                                value={this.state.createdDate}
                                                onChange={this.onChange}


                                            />
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoServiceListBillManagementDash(e)}>Back</button>
                                    <button id="form-button" onClick={e => this.addService(e, this.state.selectedBookingID.label, this.state.selectedBookingID.value)} className="btn btn-success">Add Service</button>


                                </div>
                                <br></br>

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

export default ServiceList;