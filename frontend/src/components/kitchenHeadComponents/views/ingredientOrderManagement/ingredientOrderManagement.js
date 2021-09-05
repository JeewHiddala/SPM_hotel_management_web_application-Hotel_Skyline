import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
//import ReactPaginate from 'react-paginate';
import '../../../css/dash.css';

class IngredientOrderManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // totalPages: 0,
            // page: 0,
            ingredientOrders: []
        }
        this.deleteIngredientOrder = this.deleteIngredientOrder.bind(this);
        this.navigateCreateIngredientOrderPage = this.navigateCreateIngredientOrderPage.bind(this);
        // this.retrieveIngredientOrder = this.retrieveIngredientOrder.bind(this);
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8100/ingredientOrder/')
            .then(response => {
                this.setState({ ingredientOrders: response.data.data });
                console.log("abc", response.data.data);
                console.log("fffff", this.state.ingredientOrders);
                // this.setState({ ingredientOrders: response.data.data.docs });
                // this.setState({ totalPages: response.data.data.totalPages });
                // console.log("WPF", this.state.ingredientOrders);
                // console.log("TP", this.state.totalPages);

            })
    }

    // retrieveIngredientOrder(page) {
    //     console.log("Pagef", page);
    //     axios.get('http://localhost:8100/ingredientOrder/', {
    //         params: {
    //             page: page
    //         }
    //     })
    //         .then(response => {
    //             this.setState({ ingredientOrders: response.data.data.docs });
    //             console.log("WPF", response.data.data);

    //         })

    // };



    // handlePageChange = (data) => {
    //     let selected = data.selected + 1;
    //     console.log("val", selected);
    //     this.setState({ page: selected });
    //     this.retrieveIngredientOrder(selected);
    // };


    ViewIngredientOrder(e, ingredientOrderId) {
        this.props.history.push({
            pathname: `/ingredientOrder-View/${ingredientOrderId}`,
            data: `${ingredientOrderId}`
        });

    }



    navigateCreateIngredientOrderPage(e) {
        window.location = '/create-ingredientOrder'
    }

    deleteIngredientOrder(e, ingredientId) {
        console.log("I am on Delete", ingredientId)
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
                axios.delete(`http://localhost:8100/ingredientOrder/${ingredientId}`)
                Swal.fire(
                    'Deleted!',
                    'Ingredient Order has been deleted.',
                    'success'
                )
            }
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h2><b>Kitchen Head Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                        <a href="/create-foodManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Management</button></a>
                                        <a href="/kitchenHeadDashboard" className="routeBtn">  <button type="button" className="list-group-item list-group-item-action active" aria-current="true"> Ingredient Order Management</button></a>
                                        

                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" class="btn btn-success" onClick={e => this.navigateCreateIngredientOrderPage(e)}>Add New Ingredient Order</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Ingredient Order Management</b></h3>
                                    </div>

                                    <br />
                                    
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Ingre. Order No</th>
                                                    <th>Ingre. Names</th>
                                                    <th>Quantity</th>
                                                    <th>Chef Name</th>
                                                    <th>Created Date</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    {/* <th></th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ingredientOrders.length > 0 && this.state.ingredientOrders.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.orderNumber}</td>
                                                        <td>
                                                            {item.ingredients.map((item, index) => (
                                                                <p>{item.ingredientName}</p>

                                                            ))}
                                                        </td>
                                                        <td>
                                                            {item.ingredients.map((item, index) => (
                                                                <p>{item.quantity}</p>
                                                            ))}
                                                        </td>

                                                        <td>
                                                            {item.ingredients.map((item, index) => (
                                                                <p>{item.chefName.name}</p>
                                                            ))}
                                                        </td>
                                                        <td>{item.createdDate}</td>
                                                        {/* <td></td> */}
                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.ViewIngredientOrder(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning">Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteIngredientOrder(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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








                <br /><br /><br /><br />
                <br /><br /><br /><br />
            </div>
        )
    }
}

export default IngredientOrderManagement;