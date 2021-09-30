import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import './roomBookingManagement.css';
import ReactPaginate from 'react-paginate';
import reportImage from '../../images/logo.jpg';
import jsPDF from "jspdf";
import "jspdf-autotable";


class foodOrderManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            orderId: '',
            id: '',
            foodorderings: []
        }
        this.transfertokitchen = this.transfertokitchen.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateFoodOrderingSearchPage = this.navigateFoodOrderingSearchPage.bind(this); 


    }

    componentDidMount() {

       
        axios.get('http://localhost:8100/foodordering/')
            .then(response => {
                this.setState({ foodorderings: response.data.data });
               
            })
   
    }
 


    navigateFoodOrderingSearchPage(e) {      //search
        e.preventDefault();   
        console.log("abcd", this.state.orderId);
        let orderId = this.state.orderId;  
        
        axios.get(`http://localhost:8100/foodordering/search/${orderId}`)
        .then(response =>{
            let id = response.data.data._id
            console.log("oop" + id)
            window.location = `/searchfoodorder/${id}`
            
        })
        .catch(error =>{
            alert(error.message)
        })

       
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
       
    }


    createfoodorder() {
        window.location = `/createfoodorder`
    }


    transfertokitchen(e, foodorderId) {
        this.props.history.push({
            pathname: `/transferKitchen/${foodorderId}`,
            data: `${foodorderId}`
        });
    }
    updateOrder(e, foodorderId) {
        this.props.history.push({
            pathname: `/updateFoodorder/${foodorderId}`,
            data: `${foodorderId}`
        });
    }



    deleteFoodOrder(e, foodorderId) {
        console.log("Delete", foodorderId)
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
                axios.delete(`http://localhost:8100/foodordering/${foodorderId}`)
                Swal.fire(
                    'Deleted!',
                    'Food Order Removed.',
                    'success'
                )
            }
            window.location.reload(false);
        })
    }


        
    exportFoodOrderPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
        var reportImg = new Image;
        reportImg.src = reportImage;
    
        const title = "Food Orders Report";
        const headers = [["Order Id", "Food Name", "Price", "Quantity", "Price*Qty"]];
    
        doc.addImage(reportImg, 'JPEG', 40, 13, 70, 70);
        doc.text("Skylight Hotel", marginLeft + 80, 25);
        doc.setFontSize(11);
        doc.text("No.2 Main Street, Colombo", marginLeft + 80, 40);
        doc.text("info@skylight.com", marginLeft + 80, 55);
        doc.text("+94 255 255 111", marginLeft + 80, 70);

        doc.line(40, 93, 558, 93);
        doc.setFontSize(13);
        doc.text(title, marginLeft, 110);



    const data =this.state.foodorderings.map(item =>
       
     [
            item.orderId,
          
                       item.foodorders.map(item =>[
                        item.foodName,
                    ] ),item.foodorders.map(item =>[
                        item.price,
                    ]), item.foodorders.map(item =>[
                       item.quantity,
                    ]), item.foodorders.map(item =>[
                       item.pricenquantity,
                    ]),
                   
                   
                  
     ] );



        let content = {
          startY: 122,
          head: headers,
          body: data
        };
    
        
    

        doc.autoTable(content);
        let marginTop = doc.previousAutoTable.finalY + 25;
        var today = new Date();
        var newdate = "Report Issued: " + today;
        doc.text(marginLeft, marginTop, newdate);
        doc.text("*** Disclaimer : This is an electronically generated report, hence does not require signature.", marginLeft, marginTop + 20);
        doc.line(40, 780, 558, 780);          //bottom line
        doc.save("foodorder.pdf")
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
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Food Ordering</button></a>
                                            <a href="/kitchentransferredOrderManagement" className="routeBtn"><button type="button"  className="list-group-item list-group-item-action">Kitchen Transferred Orders</button></a>
                                            
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                                            <a href="cashpaymentManagement"  id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Bill Cash Payment Handling</button></a>
                                            <a href="/creditpaymentManagement"  id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Bill Credit Payment Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={() => this.createfoodorder()}>Create Food Order</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateFoodOrderingSearchPage}>
                                            <input
                                             className="form-control me-2" 
                                             type="search" 
                                             placeholder="Enter orderId" 
                                             aria-label="Search"
                                             name="orderId"
                                             value={this.state.orderId}      //bind state value
                                             onChange={this.onChange}    //don't call function. only give a reference.
                                             />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Food Ordering</b></h3>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>OrderID</th>
                                                    <th>FoodName</th>
                                                    <th>Price (Rs.)</th>
                                                    <th>Quantity</th>

                                                    <th>Price*Qty</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.foodorderings.length > 0 && this.state.foodorderings.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.orderId}</td>
                                                        <td>
                                                            {item.foodorders.map((item, index) => (
                                                                <p id="food-tbl"> {item.foodName}</p>

                                                            ))}



                                                        </td>
                                                        <td>

                                                        {item.foodorders.map((item, index) => (
                                                                <p id="food-tbl"> {item.price}</p>

                                                            ))}
                                                        </td>
                                                        <td>

                                                            {item.foodorders.map((item, index) => (
                                                                <p id="food-tbl"> {item.quantity}</p>

                                                            ))}
                                                        </td>

                                                        <td>
                                                        {item.foodorders.map((item, index) => (
                                                                <p id="food-tbl"> {item.pricenquantity}</p>

                                                            ))}
                                                        </td>
                                                        
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.updateOrder(e, item._id)} >Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteFoodOrder(e, item._id)}>Delete</button></td>
                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.transfertokitchen(e, item._id)}>View TotalPrice TransferToKitchen</button></td>

                                                    </tr>
                                                ))}
                                            </tbody>


                                        </table>

                                        <br></br>
                                        <div className="generateReportbtn">
                                            <button type="button" className="btn btn-dark" onClick={() => this.exportFoodOrderPDF()}>Generate Report</button>
                                        </div>

                                        
                                    </div>
                                    {/* <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageChange}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    /> */}


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

export default foodOrderManagement;