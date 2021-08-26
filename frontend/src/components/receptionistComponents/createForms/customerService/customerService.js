import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

const initialState = {
    selectedService: '',
    selectedBookingID: '',
    bookingID: '',
    id: '',
    date: '',
    noOfHours: 0,
    price: '',
    cost: 0,
    options1: [],
    options2: [],
    bookings: [],
    services: []

}

class CustomerService extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onHoursChange = this.onHoursChange.bind(this);
        this.handleServiceChange = this.handleServiceChange.bind(this);
        //this.onBookingIDSelect = this.onBookingIDSelect.bind(this);
    }

    componentDidMount() {
        const { data } = this.props.location;
        this.setState({ selectedBookingID: data });

        const id = this.props.match.params.id;
        console.log("booking ID: " + id);
        this.setState({ bookingID:id });

        axios.get('http://localhost:8100/service/')
            .then(response => {
                this.setState({ services: response.data.data }, () => {
                    let data = [];
                    this.state.services.map((item, index) => {
                        let services = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(services)
                        console.log("a" + services);
                    });
                    this.setState({ options1: data });
                })
            })

        // axios.get('http://localhost:8100/booking')
        // .then(response => {
        //     this.setState({ bookings: response.data.data }, () => {
        //         let data = [];
        //         this.setState({ bookingOptions: data });
        //         this.state.bookings.map((item, index) => {
        //             if (!item.bookingNo.localeCompare(data)) {
        //                 this.setState({ bookingID: item._id });  
        //             }
        //             return 0;
        //         });
        //         this.setState({ bookingOptions: data });

        //     })


        // })

        // console.log("aaaaaaaaaaa",this.state.bookings)
        // this.state.bookings.map((item, index) => {

        //     if (!item.bookingNo.localeCompare(data)) {
        //         this.setState({ bookingID: item._id });
        //     }
        //     return 0;
        // });

        //const orderNo = this.props.match.params.id;
        //  this.setState({ [e.target.name]: e.target.value });
        // axios.get('http://localhost:8100/booking/')
        //     .then(response => {
        //         this.setState({ bookings: response.data.data }, () => {
        //             let data = [];
        //             this.setState({ options2: data });
        //             this.state.bookings.map((item, index) => {
        //                 let bookings = {
        //                     value: item._id,
        //                     label: item.bookingNo
        //                 }
        //                 data.push(bookings)
        //                 console.log("b" + bookings);
        //             });
        //             this.setState({ options2: data });
        //         })
        //     })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // onServiceNameSelect(e) {
    //     this.setState({ selectedService: e ? e.map(item => item.value) : [] });
    // }

    // onBookingIDSelect(e) {
    //     this.setState({ selectedBookingID: e ? e.map(item => item.value) : [] });
    // }

    handleServiceChange = selectedService => {
        this.setState({ selectedService });
        console.log('Option selected:', selectedService);
        this.state.services.map((item, index) => {
            console.log('service id:', item._id);
            if (!item._id.localeCompare(selectedService.value)) {
                this.setState({ price: item.pricePerHour });
                this.setState({ cost: item.pricePerHour });

            }
            return 0;
        });

    }
    onHoursChange(e) {

        if (e.target.validity.valid) {
            var hours = +(e.target.value)
            console.log('wwwww:', hours);

            this.setState({
                noOfHours: hours,
                cost: hours * this.state.price
            });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const { data } = this.props.location;
        console.log("Booking ID to send: " + data);


        let customerService = {
            serviceName: this.state.selectedService.value,
            bookingID: this.state.bookingID,
            date: this.state.date,
            noOfHours: this.state.noOfHours,
            price: this.state.price,
            cost: this.state.cost,
        }
        console.log('DATA TO SEND', customerService);
        axios.post('http://localhost:8100/customerService/create', customerService)
            .then(response => {
                this.props.history.push({

                    pathname: '/create-serviceList-continue',

                    data3: response.data.data._id

                })
                alert('Data successfully inserted')
                console.log("added customer service");
            })

            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })


    }


    render() {
        const { data } = this.props.location;

        const { selectedService } = this.state.selectedService;
        // const { selectedBookingID } = selectedBookingID;

        return (
            <div className="container-box">

                <h2>Add Service to Service List</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className="row mb-3">

                        <div className="col-6" style={{ textAlign: "left" }}>

                            <label htmlFor="bookingID" className="form-label">Booking Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bookingID"
                                name="bookingID"
                                value={this.state.selectedBookingID}
                                disabled
                            />
                            <br />
                        </div>
                        <div className="col-6" style={{ textAlign: "left" }}>
                            <label htmlFor="serviceName" className="form-label">Service Name</label>
                            <Select
                                placeholder="Select Service Name"
                                name={this.state.serviceName}
                                value={selectedService}
                                options={this.state.options1}
                                onChange={this.handleServiceChange}
                                className="basic-single"

                            />
                            <br />
                            <div className="row mb-3">
                                <div className="col-6" style={{ textAlign: "left" }}>
                                    <label htmlFor="date" className="form-label">Added Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.onChange}

                                    />
                                </div>

                                <div className="col-6" style={{ textAlign: "left" }}>
                                    <label htmlFor="noOfHours" className="form-label">No of Hours Used</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="noOfHours"
                                        name="noOfHours"
                                        value={this.state.noOfHours}
                                        onChange={this.onHoursChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6" style={{ textAlign: "left" }}>
                                    <label htmlFor="price" className="form-label">Price per Hour</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={this.state.price}
                                        disabled />
                                </div>



                                <div className="col-6" style={{ textAlign: "left" }}>
                                    <label htmlFor="cost" className="form-label">Total Cost</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="cost"
                                        name="cost"
                                        value={this.state.cost}
                                        disabled
                                    />
                                </div>

                            </div>

                            <br></br>
                            <br></br>

                            {/* <button type="submit" className="btn btn-secondary">Back</button> */}
                            <button type="submit" className="btn btn-primary">Add Service</button>
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

export default CustomerService;