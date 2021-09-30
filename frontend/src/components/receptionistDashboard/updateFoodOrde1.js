
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import './dash.css';


const initialState = {

    orderId: '',
    foodName: '',
    quantity: 0,
    price: 0,
    pricenquantity: 0,
    totalPrice: 0,
    foodorders: [],
    foodorderings: []

}

class updateFoodOrder1 extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        // this.update = this.update.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
        this.updateFood = this.updateFood.bind(this);
        this.state = initialState;
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    backtofoodorder(e) {
        window.location = '/foodorder'
    }


    updateFood(e, foodorderId) {
        this.props.history.push({
            pathname: `/create-foodOrder1/${foodorderId}`,
            data: `${foodorderId}`
        });
    }


    // update(e) {

    //     const { data } = this.props.location

    //     console.log("userid: " + data);
    //     let foodorder = {
    //         orderId: this.state.orderId,
    //         totalPrice: this.state.totalPrice,
    //         foodorders: this.state.foodorders

    //     };
    //     console.log('DATA TO SEND', foodorder);
    //     Swal.fire({
    //         title: "Update!",
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Update!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.patch(`http://localhost:8100/foodorder/update/${data}`, foodorder)
    //                 .then(response => {
    //                     Swal.fire(
    //                         'Update!',
    //                         'success'
    //                     )
    //                 })
    //                 .catch(error => {
    //                     console.log(error.message);
    //                     alert(error.message)
    //                 })
    //         }
    //     })

    // }


    componentDidMount() {
        const { data } = this.props.location

        console.log("kitchenorderid: " + data);
        axios.get(`http://localhost:8100/foodordering/${data}`)
            .then(response => {
                this.setState({ foodordering: response.data.data });
                this.setState({ orderId: response.data.data.orderId });
                this.setState({ totalPrice: response.data.data.totalPrice });
                this.setState({ foodorders: response.data.data.foodorders });
                console.log("abc" + response.data.data.orderId);
            })

  



    }


    deleteFood(e, foodorderId) {
        console.log(" Delete", foodorderId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/foodorder/${foodorderId}`)

                Swal.fire(
                    'Deleted!',
                    'Food has been deleted.',
                    'success'
                )
                window.location.reload(false);
            }
        })
    }

    render() {
        return (

            <div>
               <br/><br/>
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h2><b>Receptionist Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Check Available Rooms</button></a>
                                            <a href="/checkUnAvailableRooms" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" aria-current="true">Check UnAvailable Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    

<h3>Update Food Order Details in Order Id : {this.state.orderId}</h3>

<h5 htmlFor="content" className="form-label mb-4" >

</h5>

<form form onSubmit={this.onSubmit} onChange={this.onChange} >

    <div className={"row"}>
        <div className={"col-md-6"}>


            <div className="mb-3" style={{ textAlign: "left" }}>
                <label htmlFor="orderNumber" className="form-label">Order Id</label>
                <input
                    type="text"
                    className="form-control"
                    id="orderId"
                    name="orderId"
                    value={this.state.orderId}

                    onChange={this.onChange}
                />
            </div>


            <h5><p><b> Order Items List</b></p></h5>


          
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Food Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Price*Qty</th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.foodorders.length > 0 && this.state.foodorders.map((item, index) => (
                            <tr key={index}>

                                <td>{item.foodName}</td>
                                <td>{item.quantity}</td>

                                <td>{item.price}</td>
                                <td>{item.pricenquantity}</td>
                                <td><button type="button" className="btn btn-danger" onClick={e => this.deleteFood(e, item._id)}>Delete</button></td>
                                <td><button type="button" className="btn btn-warning" onClick={e => this.updateFood(e, item._id)}>Update</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
           
            <br></br>


            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtofoodorder(e)}> Back</button>

            <button type="button" id="form-button" className="btn btn-warning" onClick={e => this.update(e)}>Update</button>


                                              
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>


        )
    }
}

export default updateFoodOrder1;