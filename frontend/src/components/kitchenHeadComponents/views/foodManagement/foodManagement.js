import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import '../../../css/dash.css';

class FoodManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            foods: []
        }
        this.deleteFood = this.deleteFood.bind(this);
        this.viewFood = this.viewFood.bind(this);
        this.navigateCreateFoodPage = this.navigateCreateFoodPage.bind(this);
        this.retrieveFood = this.retrieveFood.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        
    }

    componentDidMount() {
        axios.get('http://localhost:8100/food/')
            .then(response => {

                this.setState({ foods: response.data.data.docs });
                this.setState({ totalPages: response.data.data.totalPages });
                console.log("WPF", this.state.foods);
                console.log("TP", this.state.totalPages);
            })
    }

    retrieveFood(page) {
        console.log("Pagef", page);
        axios.get('http://localhost:8100/food/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ foods: response.data.data.docs });
                console.log("WPF", response.data.data);

            })

    };



    handlePageChange = (data) => {
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retrieveFood(selected);
    };

    viewFood(e, foodId) {
        //  this.props.history.push({
        //     pathname:  `/food-view/`,
        //      data:`${foodId}`
        //  });
        window.location = `/food-view/${foodId}`
    }

    navigateCreateFoodPage(e) {
        window.location = '/create-food'
    }

    deleteFood(e, foodId) {
        console.log("I am on Delete", foodId)
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
                axios.delete(`http://localhost:8100/food/${foodId}`)
                Swal.fire(
                    'Deleted!',
                    'Food has been deleted.',
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
                                            <a href="/create-foodManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Food Management</button></a>
                                            <a href="/kitchenHeadDashboard" className="routeBtn">  <button type="button" className="list-group-item list-group-item-action"  > Ingredient Order Management</button></a>

                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateFoodPage(e)}>Add New Food</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Food Management</b></h3>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Food No</th>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Price</th>
                                                    <th>Description</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Chef Name</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.foods.length > 0 && this.state.foods.map((item, index) => (
                                                    <tr key={index}>

                                                        <td>{item.foodNumber}</td>
                                                        <th>{item.foodName}</th>
                                                        <td>{item.category}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.createDate}</td>
                                                        <td>{item.status}</td>
                                                        <td>
                                                            {item.chefName.map((item, index) => (
                                                                <p>{item.name}</p>
                                                            ))}
                                                        </td>
                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.viewFood(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning">Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteFood(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>

                                    </div>
                                   <br></br>
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

export default FoodManagement;

