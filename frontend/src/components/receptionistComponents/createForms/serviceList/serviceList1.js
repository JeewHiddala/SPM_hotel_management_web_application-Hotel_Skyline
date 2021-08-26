import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
//import Swal from "sweetalert2";

const initialState = {
    bookingID: '',
    id: '',
    createdDate: '',
    total: '',
    options1: [],
    customerServices:[],
    bookings: []
}


class ServiceList1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backtoServiceListBillManagementDash = this.backtoServiceListBillManagementDash.bind(this);
        // this.onBookingIDSelect = this.onBookingIDSelect.bind(this);
        //  this.addService = this.addService.bind(this);
        //  this.deleteCustomerService = this.deleteCustomerService.bind(this);

    }

    backtoServiceListBillManagementDash(e) {
        window.location = '/create-serviceListBill'
    }

    componentDidMount() {
        var data = localStorage.getItem('bookingNo') || 1;
        var data1 = localStorage.getItem('createdDate') || 1;
        var data2 = localStorage.getItem('total') || 1;

        this.setState({ createdDate: data1 });
        this.setState({ total: data2 });

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

            const {data3} = this.props.location;
            console.log("rrrr" + data3);
            
            axios.get(`http://localhost:8100/customerService/${data3}`)
            .then(response => {
                this.setState({ customerServices: response.data.data._id});
                //this.setState({ createdDate: response.data.data.createdDate});
                this.setState({ serviceName: response.data.data.serviceName.name});
                this.setState({ date: response.data.data.date});
                this.setState({ noOfHours: response.data.data.noOfHours});
                this.setState({ price: response.data.data.price});
                this.setState({ cost: response.data.data.cost});

                this.setState({ bookingID: response.data.data.bookingID});


                console.log("kkkkkkkkk" + response.data.data.date);
    
            })
            
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // onBookingIDSelect(e) {
    //     this.setState({ selectedBookingID: e ? e.map(item => item.value) : [] });
    // }



    // addService(e, bookingNo) {
    //     console.log("bookingNo" + bookingNo)
    //     this.props.history.push({
    //         pathname: '/create-customerService',
    //         data: `${bookingNo}`
    //     })
    // }


    onSubmit(e) {
        e.preventDefault();

        let serviceList = {
            bookingID: this.state.bookingID,
            createdDate: this.state.createdDate,
            total: this.state.cost,
            customerServices: this.state.customerServices,

        }
        console.log('DATA TO SEND', serviceList);
        axios.post('http://localhost:8100/serviceList/create', serviceList)
            .then(response => {
                alert('Data successfully inserted')
                console.log("abcdef");
            })

            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })


    }
    // componentDidMount() {
    //     var data = localStorage.getItem('bookingNo') || 1;
    //     var data1 = localStorage.getItem('createdDate') || 1;
    //     var data2 = localStorage.getItem('total') || 1;

    //     this.setState({ createdDate: data1 });
    //     this.setState({ total: data2 });

    //     console.log("booking  no" + data);
    //     axios.get(`http://localhost:8100/customerService/${data}`)
    //         .then(response => {
    //             this.setState({ customerServices: response.data.data })
    //         })
    //     this.setState({ bookingID: data });
    // }


    // deleteCustomerService(e, customerServiceId) {
    //     console.log("I am on Delete", customerServiceId)
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.delete(`http://localhost:8100/customerService/${customerServiceId}`)

    //             Swal.fire(
    //                 'Deleted!',
    //                 'Customer Service has been deleted.',
    //                 'success'
    //             )
    //            window.location.reload(false);
    //         }
    //     })
    // }

    render() {
        const { data } = this.props.location
        //console.log("customerService: " + data); 

        //const { selectedBookingID } = this.state.selectedBookingID;

        return (
            <div className="container"><br />

                <h2>Create New Service List</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>



                            {/* <label htmlFor="bookingID" className="form-label">Booking Number</label>
                            <Select
                                placeholder="Select Booking ID"
                                name={this.state.bookingID}
                                value={selectedBookingID}
                                options={this.state.options1}
                                disabled
                                onChange={this.onBookingIDSelect}
                                className="basic-single"

                            />
                            <br /> */}

                            <div className="mb-3">
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

                            <br></br>
                            <br></br>

                            <h5><p><b>Services Used By Customer</b></p></h5>
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
                                       
                                            <tr>

                                                <td>{this.state.serviceName}</td>
                                                <td>{this.state.date}</td>
                                                <td>{this.state.noOfHours}</td>
                                                <td>{this.state.price}</td>
                                                <td>{this.state.cost}</td>

                                            </tr>
                                       

                                    </tbody>
                                </table>
                            </div>
                            <br></br>
                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="total" className="form-label">Service Total</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="total"
                                    name="total"
                                    value={this.state.cost}
                                    disabled
                                    onChange={this.onChange}
                                />
                            </div>
                            <br />

                           {/* <button type="submit" className="btn btn-secondary">Back</button> */}
                            <button type="submit" className="btn btn-primary" onClick={e => this.backtoServiceListBillManagementDash(e)}>Create New Service List</button>
                        </div>
                    </div>
                    <br>
                    </br>
                    <br></br>
                    <br></br>
                </form>


            </div>
        )
    }
}

export default ServiceList1;