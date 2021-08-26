import React, { Component } from 'react';
import axios from 'axios';
//import Select from 'react-select';

import '../profile/profile-styles.css';

const initialState = {      //initiate states
    receptionistName: '',
    daysOfStay: 0,
    issuedDate: '',
    bookingCost: 0,
    serviceCost: 0,
    damageCost: 0,
    totalCost: 0,
    bookingNo: '',
    billNo: ''
}

class ViewCheckoutBill extends Component {
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.toPaymentPage = this.toPaymentPage.bind(this);
        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        const bill = this.props.match.params.id;
        axios.get(`http://localhost:8100/bill/${bill}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ billNo: response.data.data.billNo })
                this.setState({ receptionistName: response.data.data.receptionistName.name })
                this.setState({ daysOfStay: response.data.data.daysOfStay })
                this.setState({ issuedDate: response.data.data.issuedDate })
                this.setState({ bookingCost: response.data.data.bookingCost })
                this.setState({ serviceCost: response.data.data.serviceCost })
                this.setState({ damageCost: response.data.data.damageCost })
                this.setState({ totalCost: response.data.data.totalCost })
                this.setState({ bookingNo: response.data.data.bookingNo.bookingNo })
            });
    }

    back(e) {
        window.location = '/reception/checkout'
    }

    toPaymentPage(e, billNo) {
        console.log("bill", billNo)
        this.props.history.push({
            pathname: '/paymentm',
            data: `${billNo}`
        })
    }

    render() {
        
        return (
            <div>
                <div className="container-form">
                    <h2>View Checkout Bill </h2><br />
                    <form onSubmit={this.onSubmit}>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="billNo" className="form-label">Bill Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="billNo"
                                    name="billNo"    //give state name
                                    value={this.state.billNo}      //bind state value
                                    disabled
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="receptionistName" className="form-label">Receptionist Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="receptionistName"
                                    name="receptionistName"    //give state name
                                    value={this.state.receptionistName}      //bind state value
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="bookingNo" className="form-label">Booking No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bookingNo"
                                    name="bookingNo"    //give state name
                                    value={this.state.bookingNo}      //bind state value
                                    disabled
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="daysOfStay" className="form-label">Days of Stay</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="daysOfStay"
                                    name="daysOfStay"
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col mb-3">
                                <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}>Back</button>
                                <button type="button" className="btn btn-success" onClick={e => this.toPaymentPage(e, this.state.id)}> Proceed to Payment</button>
                            </div>
                        </div>


                    </form>

                </div>
            </div>
        )
    }
}

export default ViewCheckoutBill;