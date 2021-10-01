import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';


const initialState = {
    selectedFoodName: '',
    id: '',
    orderId: '',
    foodName: '',
    quantity: 0,
    totalPrice: '',
    options: [],
    food: [],
    price: 0,
    pricenquantity: 0


}

class addfoodproduct extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backtoFoodOrder = this.backtoFoodOrder.bind(this);
    }

    backtoFoodOrder(e) {
        window.location = '/createfoodorder'
      }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { data } = this.props.location;
       

        console.log("orderNo to send: " + data);

        localStorage.setItem('orderId', data);
        
        this.setState({ orderId: data });
       

        let foodorder = {
            orderId: data,
            foodName: this.state.foodName,
            quantity: this.state.quantity,
            price: this.state.price,
            pricenquantity: this.state.price * this.state.quantity,

            
        }
        console.log('DATA TO SEND', foodorder);

        axios.post('http://localhost:8100/foodorder/create', foodorder)
        .then(response => {
            this.props.history.push({
                pathname: '/create-foodOrder-continue',
                data: response.data.data.orderId
            })
            alert('Data successfully inserted')
            console.log("added");
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
        

    }


    render() {
        const { data } = this.props.location;
    
        console.log("orderNo1: " + data);
       
   

        return (

            <div>
            <br></br>
            <br></br>
            
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
                            
                    
           

                <h2>Add Food Product to  Order</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="orderId" className="form-label">Order Number</label>   
                            <br></br>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="orderId"
                                    name="orderId"
                                    value={data}
                                    disabled
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="foodName" className="form-label">Food Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter food Name"
                                    id="foodName"
                                    name="foodName"
                                    required
                                    value={this.state.foodName}
                                    onChange={this.onChange}
                                />
                            </div>

                
    
                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChange}

                                />
                            </div>
                            

                            <div className="row mb-3">
                                <div className="col-6">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChange}

                                />
                            </div>



                            <div className="col-6">
                                <label htmlFor="pricenquantity" className="form-label">Total</label>
                                <input
                                    className="form-control"
                                    id="pricenquantity"
                                    name="pricenquantity"
                                    value={this.state.price * this.state.quantity}

                                    onChange={this.onChange}
                                >
                                </input>
                            </div>
                            </div>

                        

                            </div>
                            </div>
                           
                           
                         
                            <div className="mb-3">
                            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoFoodOrder(e)}>Back</button>
                            <button type="submit" id="form-button" className="btn btn-primary">Add Food</button>
                            
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

export default addfoodproduct;