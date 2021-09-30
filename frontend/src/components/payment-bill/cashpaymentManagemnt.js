
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import '../css/dash.css';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

class cashPaymentManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            billNo: '',
            id: '',
            cashpayment: [],
            searchValue: '',

        }
        this.deleteCashPayment = this.deleteCashPayment.bind(this);      
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChange = this.onChange.bind(this); 
        this.retriveCashPaymentPages = this.retriveCashPaymentPages.bind(this); 
       

    }

    componentDidMount() {
        axios.get('http://localhost:8100/cashpayment/')
            .then(response => {
                this.setState({ cashpayment: response.data.data });
                this.setState({ cashpayment: response.data.data.docs });          //pagination
                this.setState({ totalPages: response.data.data.totalPages }); 
                console.log("abc" + response.data.data);
               
            })



    }



    retriveCashPaymentPages(page) {               
        console.log("Pagef", page);
        axios.get('http://localhost:8100/cashpayment/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ cashpayment: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {       
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retriveCashPaymentPages(selected);
    };


    deleteCashPayment(e, cashpaymentId) {
        console.log("Delete", cashpaymentId)
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
                axios.delete(`http://localhost:8100/cashpayment/${cashpaymentId}`)
                Swal.fire(
                    'Deleted!',
                    'Payment Removed.',
                    'success'
                )
            }
            window.location.reload(false);
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
       
    }

    searchHandler = (event) => {

     

        let searchResults = this.state.cashpayment;
         searchResults = searchResults.filter(result => {
             return result.billNo.toLowerCase().search(
                 event.target.value.toLowerCase()) !== -1;
               
         });
 
         this.setState({
            cashpayment: searchResults,
             //room: searchResults,
             searchValue: event.target.value.toLowerCase()
             
         }, () => console.log('state', this.state))
 
 
     };
     


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
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" id="active-button" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action" >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                                            <a href="/cashpaymentManagement"  id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Bill Cash Payment Handling</button></a>
                                            <a href="/creditpaymentManagement"  id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Bill Credit Payment Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >

                                <div className="float-end">
                                        <form className="d-flex" >
                                            <input
                                             className="form-control me-2" 
                                             type="search" 
                                             placeholder="Enter bill number" 
                                             aria-label="Search"
                                             name="billNo"
                                             value={this.state.searchValue}
                                             onChange={this.searchHandler}
                                             />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Cash Payment Management</b></h3>
                                    </div>

                                   
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>BillNo</th>
                                                    <th>totalBillValue</th>
                                                    <th>Receptionist</th>
                                                    <th>PaymentDate</th>
                                                    <th>Remarks</th>
                        
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.cashpayment.length > 0 && this.state.cashpayment.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.billNo}</td>
                                                        <td>{item.totalBillValue}</td>
                                                        <td>{item.receptionistName}</td>
                                                        <td>{moment(item.paymentDate).locale('en').format('YYYY-MM-DD')}</td>
                                                        
                                                        <td>{item.remarks}</td>
                                                       
                                                       
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteCashPayment(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                           
                                        </table>
                                    </div>
                                    <ReactPaginate
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
                                    />
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

export default cashPaymentManagement;