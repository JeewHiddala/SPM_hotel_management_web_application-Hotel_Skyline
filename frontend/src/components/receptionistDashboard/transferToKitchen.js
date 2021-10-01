import './createBooking.css';
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';



class transferToKitchen extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            foodorders: [],
            orderId:'',
            totalPrice:''
           }   
         
    
    }


    componentDidMount() {
        const { data } = this.props.location

        console.log("kitchenorderid: " + data);
        axios.get(`http://localhost:8100/foodordering/${data}`)
            .then(response => {
                this.setState({ foodordering: response.data.data });
                this.setState({ orderId: response.data.data.orderId });
                // this.setState({ totalPrice: response.data.data.totalPrice });
                this.setState({ foodorders: response.data.data.foodorders});
                console.log("abc" + response.data.data.orderId);
            })


                 axios.get(`http://localhost:8100/foodordering/charge/${data}`)
        .then(response => {
          this.setState({totalPrice: response.data.totalPrice})
          console.log("orderid: " + data);
        })
        .catch(error => {
          alert(error.message)
        })
    }





    backtofoodorder(e) {
        window.location = '/foodorder'
    }


    transfer() {

        const { data } = this.props.location

        console.log("userid: " + data);
        let foodorder = {
            orderId: this.state.orderId,
            totalPrice: this.state.totalPrice,
            foodorders: this.state.foodorders

        };
        console.log('DATA TO SEND', foodorder);
        Swal.fire({
            title: "Transfer to Kitchen!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Transfer!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8100/kitchenorder/create', foodorder)
                    .then(response => {
                        Swal.fire(
                            'Transfer!',
                            'success'
                        )
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
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
            <div className="container"><br />
                <br></br>
                <h3>Kitchen Transfering Food Order Details for Order Id : {this.state.orderId}</h3>
                
                <h5 htmlFor="content" className="form-label mb-4" >

</h5>

<form onSubmit={this.onSubmit} >

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
                                    disabled
                                    onChange={this.onChange}
                                />
                            </div>


                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="totalPrice" className="form-label">Order Total</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="totalPrice"
                                    name="totalPrice"
                                    value={this.state.totalPrice}
                                    disabled
                                    onChange={this.onChange}
                                />
                            </div>

                    
                         

                            <h5><p><b> Order ItemsList</b></p></h5>
                          

                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Food Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Price*Qty</th>
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.foodorders.length > 0 && this.state.foodorders.map((item, index) => (
                                            <tr key={index}>

                                                <td>{item.foodName}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                                <td>{item.pricenquantity}</td>
                                                
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            
            
                           
                            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtofoodorder(e)}> Back</button>

                            <button type="button" id="form-button" className="btn btn-success" onClick={() => this.transfer()}>Transfer</button>
                        
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

export default transferToKitchen;