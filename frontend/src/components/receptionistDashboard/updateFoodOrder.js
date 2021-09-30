// import './createBooking.css';
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
// import image from '../images/w1.jpg';
// import CheckoutSteps from '../checkoutSteps/checkoutSteps';
import './dash.css';


const initialState = {

    orderId: '',
    foodName: '',
    quantity: 0,
    price: 0,
    foodorders: [],
    foodorderings:[],
    pricenquantity: 0,
    totalPrice: 0
}

class updateFoodOrder extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.update = this.update.bind(this);
        //this.backtoFoodOrderManagement = this.backtoFoodOrderManagement.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
        this.updateFood = this.updateFood.bind(this);
        
        this.state = initialState;

    }


    componentDidMount() {

        // const data = this.props.match.params.id;
        // console.log("rrrr" + data);

         const { data } = this.props.location

    //var data1 = localStorage.getItem('orderId') || 1;

        //console.log("ing ord no" + data1);
        //const { data } = this.props.location
        //this.setState({ orderId: data });

        console.log("userid: " + data);
        axios.get(`http://localhost:8100/foodorder/get-foods-in-order/${data}`)
            .then(response => {
                this.setState({ foodorders: response.data.data });
                //this.setState({ foodorderings: response.data.data });
                this.setState({ orderId: response.data.data.orderId });
                //this.setState({ foodorders: response.data.data.foodorders });
                console.log("abc" + response.data.data.orderId);
            })
        this.setState({ orderId: data });
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    update() {

        const { data } = this.props.location

        console.log("userid: " + data);
        let foodorder = {
            orderId: data,
            
            foodorders: this.state.foodorders

        };
        console.log('DATA TO SEND', foodorder);
        Swal.fire({
            title: "Update!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:8100/foodordering/update/${data}`, foodorder)
                    .then(response => {
                        Swal.fire(
                            'Update!',
                            'success'
                        )
                        window.location = '/foodorder'
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            }
        })

    }


    updateFood(e, foodorderId) {
        this.props.history.push({
            pathname: `/create-foodOrder1/${foodorderId}`,
            data: `${foodorderId}`
        });
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

        const { data } = this.props.location;

    
        console.log("orderNo6: " + data);

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
                                    <div className="container"><br />
                                        <br></br>
                                        <h3>Updated Food Order Details in Order Id : {data}</h3>

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


                                                    <h5><p><b> Order ItemsList</b></p></h5>


                                                  
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
                                                   
                                                   


                                                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtofoodorder(e)}> Back</button>

                                                    <button type="button" id="form-button" className="btn btn-warning" onClick={() => this.update()}>Update</button>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
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

export default updateFoodOrder;