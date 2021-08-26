import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import './roomBookingManagement.css';
import ReactPaginate from 'react-paginate';

class foodOrderManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            foodorder: [],
        }
        // this.transferKitchen = this.transferKitchen.bind(this);
        // this.viewFoodorder = this.viewFoodorder.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.retriveFoodorderPages = this.retriveFoodorderPages.bind(this); 

    }

    componentDidMount() {
        axios.get('http://localhost:8100/foodorder/')
            .then(response => {
                this.setState({ foodorder: response.data.data });
                this.setState({ foodorder: response.data.data.docs });          //pagination
                this.setState({ totalPages: response.data.data.totalPages }); 
            })

    }

    createfoodorder() {
        window.location = `/createfoodorder`
    }

    transfertokitchen(e, foodorderId) {
        this.props.history.push({
            pathname: `/transferkitchen/${foodorderId}`,
            data: `${foodorderId}`
        });
    }


    retriveFoodorderPages(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/foodorder/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ foodorder: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {          //pagination
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retriveFoodorderPages(selected);
    };


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
                axios.delete(`http://localhost:8100/foodorder/${foodorderId}`)
                Swal.fire(
                    'Deleted!',
                    'Food Order Removed.',
                    'success'
                )
            }
            window.location.reload(false);
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h2><b>Receptionist Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>

                                            <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Attendance</button>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Food Ordering</button></a>
                                            <button type="button" className="list-group-item list-group-item-action">Service List Bill</button>
                                            <button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button>
                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={() => this.createfoodorder()}>Create Food Order</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
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

                                                    <th>TotalPrice (Rs.)</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.foodorder.length > 0 && this.state.foodorder.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.orderId}</td>
                                                        <td>{item.foodName}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.quantity}</td>

                                                        <td>{item.totalPrice}</td>

                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.updateOrder(e, item._id)} >Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteFoodOrder(e, item._id)}>Delete</button></td>
                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.transfertokitchen(e, item._id)}onClick={e => this.transfertokitchen(e, item._id)}>TransferToKitchen</button></td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                        
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








                <br /><br /><br /><br />
                <br /><br /><br /><br />
            </div>
        )
    }
}

export default foodOrderManagement;