import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

const initialState = {
    orderId: '',
    foodorders: [],
   
  
}

class createFoodOrders extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addFood = this.addFood.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
        this.onCharge = this.onCharge.bind(this);
        this.backtoFoodOrderManagement = this.backtoFoodOrderManagement.bind(this);
        this.backtoFoodOrderManagementDash = this.backtoFoodOrderManagementDash.bind(this);
    }


    backtoFoodOrderManagement(e) {
        window.location = '/create-foodOrder'
    }

    backtoFoodOrderManagementDash(e) {
        window.location = '/foodorder'
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    addFood(e, orderNo) {
        console.log("orderNo: " + orderNo);
        this.props.history.push({
            pathname: '/create-foodOrder',
            data: `${orderNo}`
        })
    }



    onCharge(e) {

            this.setState({

                totalPrice: totalPrice + pricenquantity
            });
        
    }

    onSubmit(e) {
        e.preventDefault();

        let foodOrdering = {

            orderId: this.state.orderId,
            
            foodorders: this.state.foodorders,
            
           

        };
        console.log('DATA TO SEND', foodOrdering);
        axios.post('http://localhost:8100/foodordering/create', foodOrdering)
            .then(response => {
                Swal.fire(
                    ' Booking!',
                    'success'
                  )
                  window.location = '/foodorder'
            })
           

            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

            

    }
    componentDidMount() {
        var data = localStorage.getItem('orderId') || 1;
       
    

        console.log("userid: " + data);
        axios.get(`http://localhost:8100/foodorder/get-foods-in-order/${data}`)
            .then(response => {
                this.setState({ foodorders: response.data.data })
               
            })
        this.setState({ orderId: data });

        }

    deleteFood(e, foodorderId) {
        console.log("I am on Delete", foodorderId)
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
                    'Ingredient has been deleted.',
                    'success'
                )
                window.location.reload(false);
            }
        })
    }
    render() {
        const { data } = this.props.location;

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
                                        <a href="/checkAvailableRooms"  className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Check Available Rooms</button></a>
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
                           
         
                <h2>Create New Food Order</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="orderId" className="form-label">Food Order Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="orderId"
                                    name="orderId"
                                    value={this.state.orderId}
                                    disabled
                                    onChange={this.onChange}
                                />
                            </div>


               

                            <br></br>
                            <button onClick={e => this.addFood(e, this.state.orderId)} className="btn btn-primary">Add More Foods</button>
                            <br></br>
                            <br></br>

                            <h5><p><b>Product Order List</b></p></h5>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>FoodName</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Price*Qty</th>
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
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                          
                            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoFoodOrderManagement(e)}>Back</button>
                            <button type="submit" id="form-button" className="btn btn-primary" onClick={e => this.backtoFoodOrderManagementDash(e)}>Create the Order</button>
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

export default createFoodOrders;