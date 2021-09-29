import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Select from 'react-select';

import '../profile/profile-styles.css';

const initialState = {      //initiate states
    receptionistName: '',
    receptionistOptions: [],
    employees: [],
    daysOfStay: 0,
    issuedDate: '',
    bookingCost: 0,
    serviceCost: 0,
    damageCost: 0,
    totalCost: 0,
    billNo: '',
    bookingNo: '',
    bookingOptions: [],
    bookings: [],
    rooms: null,
    serviceLists: null
}

class CreateCheckoutBill extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onDamageCostChange = this.onDamageCostChange.bind(this);
        this.handleBookingChange = this.handleBookingChange.bind(this);
        this.handleReceptionistChange = this.handleReceptionistChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        axios.get('http://localhost:8100/employee/workingReceptionists')
            .then(response => {
                this.setState({ employees: response.data.data }, () => {
                    let data = [];
                    this.setState({ receptionistOptions: data });
                    this.state.employees.map((item, index) => {
                        let employees = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(employees)
                        return 0;
                    });
                    this.setState({ receptionistOptions: data });

                })

            })
        axios.get('http://localhost:8100/booking')
            .then(response => {
                this.setState({ bookings: response.data.data }, () => {
                    let data = [];
                    this.setState({ bookingOptions: data });
                    this.state.bookings.map((item, index) => {
                        let bookings = {
                            value: item._id,
                            label: item.bookingNo
                        }
                        data.push(bookings)
                        return 0;
                    });
                    this.setState({ bookingOptions: data });

                })

            })
            
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    onDamageCostChange(e){
        // let damage = parseFloat(e.target.value);
        // let total = parseFloat(this.state.totalCost);
        // this.setState({
        //     damageCost: damage,
        //     totalCost: total + damage
        // });
        if (e.target.validity.valid) {
            var damage = +(e.target.value)
            this.setState({
                damageCost: damage,
                totalCost: damage + this.state.bookingCost + this.state.serviceCost
              }); 
          }
    }

    

    back(e) {
        window.location = '/reception/checkout'
    }

    handleBookingChange = bookingNo => {
        this.setState({ bookingNo });
        console.log('Option selected:', bookingNo);
        this.state.bookings.map((item, index) => {
            console.log('book:', item.bookingNo);
            if (!item.bookingNo.localeCompare(bookingNo.label)) {
                this.setState({ daysOfStay: item.days });

                axios.get('http://localhost:8100/room/checkoutRooms/', {
                    params: {
                        roomNo: item.roomNo
                    }
                })
                    .then(response => {
                        this.setState({ rooms: response.data.data }, () => {
                            console.log('Room selected:', response.data.data.price);
                            let roomCost = response.data.data.price;
                            let serviceCost = 0;
                            axios.get('http://localhost:8100/serviceList/')
                                .then(response => {
                                    this.setState({ serviceLists: response.data.data }, () => {
                                        console.log('serviceLists selected:', response.data.data);
                                        this.state.serviceLists.map((item) => {
                                            if (!item.bookingID.bookingNo.localeCompare(bookingNo.label)){
                                                serviceCost += item.total;
                                                console.log('cost:', serviceCost);
                                            }
                                            // return 0;
                                        });
                                        this.setState({
                                            bookingCost: roomCost * item.days,
                                            serviceCost: serviceCost,
                                            totalCost: roomCost * item.days + serviceCost + this.state.damageCost
                                        });
                                        

                                    })

                                })
                                console.log('cos444t:', serviceCost);
                                console.log('123:', this.state.serviceCost);
                        })

                    })
                //let tCost = this.state.bookingCost + this.state.serviceCost;
                console.log('TCOST:', this.state.totalCost);
                //this.setState({ totalCost: tCost });
            }
            return 0;
        });

    }

    handleReceptionistChange = receptionistName => {
        this.setState({ receptionistName });
        console.log('Option selected:', receptionistName);
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        let bill = {
            bookingNo: this.state.bookingNo.value,
            daysOfStay: this.state.daysOfStay,
            receptionistName: this.state.receptionistName.value,
            issuedDate: this.state.issuedDate,
            billNo: this.state.billNo,
            bookingCost: this.state.bookingCost,
            serviceCost: this.state.serviceCost,
            damageCost: this.state.damageCost,
            totalCost: this.state.totalCost
        }
        console.log('DATA TO SEND', bill);
        axios.post('http://localhost:8100/bill/create', bill)
            .then(response => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New Bill details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  window.location = '/reception/checkout'

            })
            .catch(error => {
                console.log(error.message);
                //alert(error.message)
            })
    }


    render() {
        const { bookingNo } = this.state.bookingNo;
        const { receptionistName } = this.state.receptionistName;
        return (
            <div>
                <div className="container-form">
                    <h2>Create Checkout Bill</h2><br />
                    <form onSubmit={this.onSubmit}>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="billNo" className="form-label">Bill Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="billNo"
                                    name="billNo"    //give state name
                                    required
                                    value={this.state.billNo}      //bind state value
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="receptionistName" className="form-label">Receptionist Name</label>
                                <Select
                                    className="basic-single"
                                    name="receptionistName"
                                    options={this.state.receptionistOptions}
                                    value={receptionistName}
                                    onChange={this.handleReceptionistChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="bookingNo" className="form-label">Booking No</label>
                                <Select
                                    className="basic-single"
                                    name="bookingNo"
                                    options={this.state.bookingOptions}
                                    value={bookingNo}
                                    onChange={this.handleBookingChange}
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="daysOfStay" className="form-label">Days of Stay</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="daysOfStay"
                                    name="daysOfStay"
                                    required
                                    value={this.state.daysOfStay}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="bookingCost" className="form-label">Room Booking Cost</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="bookingCost"
                                    name="bookingCost"
                                    value={this.state.bookingCost}
                                    disabled
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="serviceCost" className="form-label">Service Bill Cost</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="serviceCost"
                                    name="serviceCost"
                                    value={this.state.serviceCost}
                                    disabled
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="damageCost" className="form-label">Damage Claims</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="damageCost"
                                    name="damageCost"
                                    value={this.state.damageCost}
                                    onChange={this.onDamageCostChange}
                                    step="any"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="totalCost" className="form-label">Total Bill Value</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="totalCost"
                                    name="totalCost"
                                    value={this.state.totalCost}
                                    disabled
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="issuedDate" className="form-label">Issued Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="issuedDate"
                                    name="issuedDate"
                                    value={this.state.issuedDate}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col mb-3">
                                <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}>Back</button>
                                <button type="submit" className="btn btn-success" > Create Bill</button>
                            </div>
                        </div>


                    </form>

                </div>
            </div>
        )
    }
}

export default CreateCheckoutBill;