import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';

const initialState = {      //initiate states
    roomNo: '',
    category: '',
    airConditioningCategory: '',
    description: '',
    isAvailable: 1,
    price: 0
}

class SearchRoom extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.deleteRoom = this.deleteRoom.bind(this);
        this.navigateEditRoomPage = this.navigateEditRoomPage.bind(this);
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        const searchRoomdetails = this.props.match.params.id;
        console.log("rrrr" + searchRoomdetails);
        axios.get(`http://localhost:8100/room/search/${searchRoomdetails}`)
          .then(response => {
            this.setState({ id: response.data.data._id })
            this.setState({ roomNo: response.data.data.roomNo })
            this.setState({ category: response.data.data.category })
            this.setState({ airConditioningCategory: response.data.data.airConditioningCategory })
            this.setState({ description: response.data.data.description })
            this.setState({ price: response.data.data.price })
            this.setState({ isAvailable: response.data.data.isAvailable })
    
            console.log("stat"+response.data.data)
          })
          .catch(error => {
            // alert(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry. There is no data according to this Room number!',
                footer: '<a href="/roomManagement"/>'
              })
              .then((result) => {
                if (result.isConfirmed) {
                    window.location = '/roomManagement'
                }
    
            })
          })
    
      }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    back(e) {
        window.location = '/roomManagement'
    }

    navigateEditRoomPage(e, roomId) {                 //edit
        window.location = `/updateRoom/${roomId}`
    }

    deleteRoom(e, roomId) {
        console.log("I am on Delete", roomId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/room/${roomId}`)
                Swal.fire(
                    'Deleted!',
                    'Room has been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/roomManagement'
                    }
                })
                // window.location.reload(false);
            }
        })
    }


    render() {
        return (
            <div>
                <br /><br />
                <br />
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

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
                                        <br/>
                                        <h4 className="topic"><b>Searched Room Details</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                        <div className = "row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="roomNo" className="form-label sub-topic">Room Number</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
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
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                id="category"
                                                name="category"    //give state name
                                                value={this.state.category}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                        </div>
                                        <div className = "row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="airConditioningCategory" className="form-label sub-topic">Air Conditioning Category</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                id="airConditioningCategory"
                                                name="airConditioningCategory"    //give state name
                                                value={this.state.airConditioningCategory}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                            <div className="col-6">
                                                <label htmlFor="Price" className="form-label sub-topic">Price</label>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    className="form-control"
                                                    id="price"
                                                    name="price"
                                                    value={this.state.price}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="description" className="form-label sub-topic">Description</label>
                                                <textarea
                                                   readOnly
                                                   className="form-control"
                                                   placeholder = "Enter Description"
                                                   id="description"
                                                   name="description"    //give state name
                                                   value={this.state.description}      //bind state value
                                                   onChange={this.onChange}    //don't call function. only give a reference. 
                                                />
                                            </div>
                                            <div className="col mb-3">
                                                    <label htmlFor="states" className="form-label sub-topic">Status</label><br/>
                                                        {this.state.isAvailable == true
                                                            ? <span className="badge bg-success"> Available </span>
                                                            : <span className="badge bg-danger"> Unavailable </span>
                                                        }
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    <button type="button" id="button" className="btn btn-warning" onClick={e => this.navigateEditRoomPage(e, this.state.id)}>Edit</button>
                                                    <button type="button" id="button" className="btn btn-danger" onClick={e => this.deleteRoom(e, this.state.id)}>Delete</button>
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

export default SearchRoom;