import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
//import ReactPaginate from 'react-paginate';
import '../../../css/dash.css';


class ServiceListManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // totalPages: 0,
            // page: 0,
            serviceLists: [],
        }
        this.deleteServiceBill = this.deleteServiceBill.bind(this);
        this.navigateCreateServiceBillPage = this.navigateCreateServiceBillPage.bind(this);
        this.navigateUpdateServiceListPage = this.navigateUpdateServiceListPage.bind(this);

        // this.retrieveServiceList = this.retrieveServiceList.bind(this);
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8100/serviceList/')
            .then(response => {
                this.setState({ serviceLists: response.data.data });
                console.log("abc", response.data.data);
                console.log("fffff", this.state.serviceLists);
                // this.setState({ serviceLists: response.data.data.docs });
                // this.setState({ totalPages: response.data.data.totalPages });
                // console.log("WPF", this.state.serviceLists);
                // console.log("TP", this.state.totalPages);
            })
    }

    // retrieveServiceList(page) {
    //     console.log("Pagef", page);
    //     axios.get('http://localhost:8100/serviceList/', {
    //         params: {
    //             page: page
    //         }
    //     })
    //         .then(response => {
    //             this.setState({ serviceLists: response.data.data.docs });
    //             console.log("WPF", response.data.data);

    //         })

    // };



    // handlePageChange = (data) => {
    //     let selected = data.selected + 1;
    //     console.log("val", selected);
    //     this.setState({ page: selected });
    //     this.retrieveServiceList(selected);
    // };



    ViewSericeList(e, serviceListId) {
        this.props.history.push({
            pathname: `/serviceList-View/${serviceListId}`,
            data: `${serviceListId}`
        });

    }

   navigateUpdateServiceListPage(e, serviceListId) {      //edit
        localStorage.setItem('serviceListId', serviceListId);
        
        window.location = `/update-ServiceList/${serviceListId}`
    }

    navigateCreateServiceBillPage(e) {
        window.location = '/create-serviceList'
    }


    deleteServiceBill(e, serviceListId) {
        console.log("I am on Delete", serviceListId)
        Swal.fire({
            title: 'Are you sure you want to delete this Service List bill?',
            text: "This item will be deleted immediently. You can't undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/serviceList/${serviceListId}`)
                Swal.fire(
                    'Deleted!',
                    'Service Bill is successfully deleted.',
                    'success'
                )
            }
        })
    }

    render() {
        return (
            <div>
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
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                                Room Booking Management
                                            </button></a>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Attendance</button>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateServiceBillPage(e)}>Create Service List Bill</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Service List Bill Management</b></h3>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Booking No</th>
                                                    <th>Date</th>
                                                    <th>Service Name</th>
                                                    <th>Ser.Used.Date</th>
                                                    <th>No of Hours</th>
                                                    <th>Price/ Hour</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.serviceLists.length > 0 && this.state.serviceLists.map((item, index) => (
                                                    <tr key={index}>

                                                        <td>{item.bookingID.bookingNo}</td>
                                                        <td>{item.createdDate}</td>

                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.serviceName.name}</p>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.date}</p>
                                                            ))}
                                                        </td>

                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.noOfHours}</p>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.price}</p>
                                                            ))}
                                                        </td>
                                                        <td>{item.total}</td>


                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.ViewSericeList(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.navigateUpdateServiceListPage(e, item._id)}>Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteServiceBill(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* <button type="button" className="btn btn-dark">Generate Report</button> */}

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








                <br /><br /><br /><br />
                <br /><br /><br /><br />
            </div>
        )
    }
}

export default ServiceListManagement;