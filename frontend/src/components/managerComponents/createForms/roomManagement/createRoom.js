import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';

const initialState = {      //initiate states
    roomNo: '',
    category: '',
    airConditioningCategory: '',
    description: '',
    price: 0
}

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    back(e) {
        window.location = '/roomManagement'
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        let room = {
            roomNo: this.state.roomNo,
            category: this.state.category,
            airConditioningCategory: this.state.airConditioningCategory,
            description: this.state.description,
            price: this.state.price
        }
        console.log('DATA TO SEND', room);    
        axios.post('http://localhost:8100/room/create', room)
            .then(response => {
                // alert('Room Data successfully inserted')
                this.setState({ 
                    roomNo: '',
                    category: '',
                    airConditioningCategory: '',
                    description: '',
                    price: 0
                 })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New Room details has been saved',
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
        return (
            <div>
                <br /><br />

                {/* <h1 class="hotel-name"> Hotel Skylight</h1>
                <br />
                <div class="container">
                    <div class="row justify-content-end">
                        <div class="col-1">
                            Username
                        </div>
                    </div>
                </div> */}
                <br />
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                            <div className="row">
                                    <div className="container" >
                                    <h5><b className="sub-topic">Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action " >
                                                Employee Management
                                            </button>
                                            <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
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
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Monthly Salary Management</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Price Lists</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8">
                                <div className="container" >
                                    {/* <div className="float-end">
                                        <button type="button" className="btn btn-success">Create Employee</button>
                                    </div> */}
                                    
                                    {/* <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div> */}
                                    <div className="col-4">
                                        <br/>
                                        <h4 className="topic"><b>Add new Room</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                        <div className = "row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="roomNo" className="form-label sub-topic">Room Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Room Number"
                                                id="roomNo"
                                                name="roomNo"    //give state name
                                                pattern="[A-Z]{1}[0-9]{3}"
                                                maxLength="4"
                                                required
                                                value={this.state.roomNo}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="category" className="form-label sub-topic">Category</label>
                                            <select className="form-select" aria-label="Default select example"
                                                onChange={this.onChange} 
                                                value={this.state.category}
                                                name="category"
                                            >
                                                <option selected>Open this select Room Category</option>
                                                <option value="Single">Single</option>
                                                <option value="Double">Double</option>
                                                <option value="Triple">Triple</option>
                                                <option value="Quad">Quad</option>
                                                <option value="Summer Suite">Summer Suite</option>
                                                <option value="Honeymoon Suite">Honeymoon Suite</option>
                                                <option value="Presidential Suite">Presidential Suite</option>
                                                <option value="Connecting rooms">Connecting room</option>
                                                <option value="Accessible Room">Accessible Room</option>
                                                <option value="Villa">Villa</option>
                                                <option value="Hollywood Twin Room">Hollywood Twin Room</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className = "row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="airConditioningCategory" className="form-label sub-topic">Air Conditioning Category</label>
                                            <select className="form-select" aria-label="Default select example"
                                                onChange={this.onChange} 
                                                value={this.state.airConditioningCategory}
                                                name="airConditioningCategory"
                                            >
                                                <option selected>Select Room Air Conditioning Category</option>
                                                <option value="A/C">A/C</option>
                                                <option value="Non A/C">Non A/C</option>
                                            </select>
                                        </div>
                                            <div className="col-6">
                                                <label htmlFor="Price" className="form-label sub-topic">Price</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="price"
                                                    name="price"
                                                    required
                                                    value={this.state.price}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="description" className="form-label sub-topic">Description</label>
                                                <textarea
                                                   className="form-control"
                                                   placeholder = "Enter Description"
                                                   id="description"
                                                   name="description"    //give state name
                                                   maxLength="100"
                                                   value={this.state.description}      //bind state value
                                                   onChange={this.onChange}    //don't call function. only give a reference. 
                                                />
                                            </div>
                                            <br></br>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    {/* <button type="button" id="button" className="btn btn-info" > Clear</button> */}
                                                </div>
                                                <div className="col mb-3">
                                                    <button type="submit" id="button" className="btn btn-success float-end">Submit</button>
                                                </div>
                                            </div>
                                    </form>
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

export default CreateRoom;