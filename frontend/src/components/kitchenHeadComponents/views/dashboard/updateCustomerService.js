import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from "sweetalert2";


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

class updateCustomerService extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onHoursChange = this.onHoursChange.bind(this);
        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:8100/service/get/')
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

        const customerService = this.props.match.params.id;
        console.log("bbb" + customerService);
        axios.get(`http://localhost:8100/customerService/${customerService}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ selectedBookingID: response.data.data.bookingID.bookingNo })
                this.setState({ serviceName: response.data.data.serviceName })
                this.setState({ date: response.data.data.date })
                this.setState({ noOfHours: response.data.data.noOfHours })
                this.setState({ price: response.data.data.price })
                this.setState({ cost: response.data.data.cost })


                // console.log("iiiii" + this.state.chefName)
                // console.log("asd" + this.state.chefValue)
            })
            .catch(error => {
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

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

    // onChefNameSelect(e) {
    //     this.setState({ selectedChef: e ? e.map(item => item.value) : [] });
    // }

    // onChangeSelect(e) {
    //     this.setState({ selectedChef: e.target.value });
    // }
    // handleChange = selectedChef => {
    //     this.setState({ selectedChef });
    //     console.log('Option selected:', selectedChef);
    // };

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. 
        const { data } = this.props.location;

        console.log("bookingID to send: " + data);
        localStorage.setItem('bookingID', data);
        this.setState({ bookingID: data });

        let customerService = {
            bookingID: data,
            serviceName: this.state.selectedService.value,
            date: this.state.date,
            noOfHours: this.state.noOfHours,
            price: this.state.price,
            cost: this.state.cost
        }
        console.log('DATA TO SEND', customerService);

        axios.patch(`http://localhost:8100/customerService/update/${this.state.id}`, customerService)
            .then(response => {
                // alert('Food Data successfully updated')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated customer Service details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                var data1 = localStorage.getItem('serviceListId') || 1;
                window.location = `/update-ServiceList/${data1}`
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
        const { data } = this.props.location;
        //this.setState({ orderNumber: orderNo });
        console.log("bookingID: " + data);

        const { data1 } = this.props.location;

        const { selectedService } = this.state.selectedService;
        // const { selectedChef } = this.state.selectedChef;
        // console.log("qqqqq " + this.state.selectedChef.label);

        // let chefName = this.state.chefName;
        // const chefValue = this.state.chefValue;

        // console.log("rrrrrrrrrrr " + chefName);



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
                                        <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
                                        <button type="button" className="list-group-item list-group-item-action">Employee Attendance</button>
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
                                            <label htmlFor="bookingID" className="form-label">Booking Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="bookingID"
                                                name="bookingID"
                                                value={this.state.selectedBookingID}
                                                disabled
                                            />
                                        </div>
                                        <br /> <br /> <br />
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
                                                        type="number"
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

                                            <br />

                                            <br />



                                            <div className="mb-3">
                                                {/* <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrder(e)}>Back</button> */}
                                                <button type="submit" id="form-button" className="btn btn-warning">Update Customer Service</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    </br>
                                    <br></br>
                                    <br></br>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default updateCustomerService;