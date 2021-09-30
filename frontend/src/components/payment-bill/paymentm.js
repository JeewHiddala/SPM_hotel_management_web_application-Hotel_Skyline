
import React, { Component } from 'react';
import axios from 'axios';
import image from '../../images/cash.jpg';
import image2 from '../../images/credit.jpg';

import '../payment-bill/paymentForm.css';

const initialState = {

  billNo: '',
  employee: [],
  options: [],
  paymentType: 'select',
  totalCost: 0,
  damageCost: 0,
  serviceCost: 0,
  bookingCost: 0,
  paymentDate: '',
  remarks: ''
}

class Paymentm extends Component {

  constructor(props) {
    super(props);
   
    this.state = {

      initialState,
    }

    this.viewcashPayment = this.viewcashPayment.bind(this);

  }

  componentDidMount() {
    const { data } = this.props.location

    console.log("billid: " + data);
    axios.get(`http://localhost:8100/bill/${data}`)
      .then(response => {
        this.setState({ bill: response.data.data });
        this.setState({ billNo: response.data.data.billNo });
        this.setState({ damageCost: response.data.data.damageCost });
        this.setState({ serviceCost: response.data.data.serviceCost });
        this.setState({ bookingCost: response.data.data.bookingCost });
        this.setState({ totalCost: response.data.data.totalCost });
        this.setState({ receptionistName: response.data.data.receptionistName.name });
        console.log("abc" + response.data.data.billNo);
        console.log("abc" + response.data.data.serviceCost);
        console.log("abc" + response.data.data.totalCost);
        console.log("abc" + response.data.data.receptionistName.name);
       
      })


  }

  viewcashPayment(e, billId) {
    this.props.history.push({
      pathname: `/cashpaymentform/${billId}`,
      data: `${billId}`
    });
  }

  viewcreditPayment(e, billId) {
    this.props.history.push({
      pathname: `/creditpaymentform/${billId}`,
      data: `${billId}`
    });
  }

  back(e, billNo) {
    this.props.history.push({
      pathname: `/reception/viewBill/${billNo}`,
      data: `${billNo}`
    })
  }

  render() {

    const { data } = this.props.location
    console.log("userid: " + data);
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
                                            <a href="/checkUnAvailableRooms" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Check UnAvailable Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                            

                            </div>
                            <div className="col-8 align-self-stretch ">
                                <div className="container" ></div>
      <div>

        <div className="container1">
        

          <h2>Select Payment Method</h2>
          <form  >

            <div className="row">
              <div className="col-md-6">

                <div>
                  <img className="img-payment" src={image} alt={"logo"} />
                  <br></br>
                  <button type="button" class="btn btn-default btn-lg btn-block" onClick={e => this.viewcashPayment(e, data)}>Pay Using Cash</button>
                </div>
                <br></br>

              </div>
              <div className="col-md-6">
                <div>
                  <img className="img-payment" src={image2} alt={"logo"} ></img>
                  <br/>
                  <button type="button" class="btn btn-default btn-lg btn-block" onClick={e => this.viewcreditPayment(e, data)}>Pay Using Credit Card</button>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-secondary" onClick={e => this.back(e, data)}> Back</button>
          

          
        </form>
      </div>
</div>
</div>
</div>

</div></div>
<br/><br/>
</div>



    )
  }
}

export default Paymentm;