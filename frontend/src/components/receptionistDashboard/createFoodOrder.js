
import React, { Component } from 'react';
import './dash.css';


const initialState = {

    orderId: '',

}

class createFoodOrder extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.addFood = this.addFood.bind(this);
        this.state = initialState;
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    backtofoodorder(e) {
        window.location = '/foodorder'
    }


    addFood(e, orderNo, id) {
        if ((orderNo === '')) {
            alert('Please enter food order id!');

        } else {
           
            this.props.history.push({
                pathname: '/create-foodOrder/${id}',
                data: `${orderNo}`
            })
        }
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
                               
                             
                             <h2>Add New Food Order</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="orderId" className="form-label">Food Order Id</label><br>
                                </br>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Food Order Id"
                                    id="orderId"
                                    name="orderId"                                   
                                    maxLength="7"
                                    value={this.state.orderId}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>

                          
                            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtofoodorder(e)}> Back</button>
                      
                            <button type="submit" id="form-button" onClick={e => this.addFood(e, this.state.orderId)} className="btn btn-success">Add Food Products</button>
  
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

export default createFoodOrder;