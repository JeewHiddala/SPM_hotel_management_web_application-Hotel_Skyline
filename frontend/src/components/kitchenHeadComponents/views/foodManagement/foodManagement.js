import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import '../../../css/dash.css';
import UserService from "../../../../services/user.service";

class FoodManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            foodNumber: '',
            id: '',
            foods: [],
            isManager: false
        }
        this.deleteFood = this.deleteFood.bind(this);
        this.viewFood = this.viewFood.bind(this);
        this.navigateCreateFoodPage = this.navigateCreateFoodPage.bind(this);
        this.navigateUpdateFoodPage = this.navigateUpdateFoodPage.bind(this);
        this.navigateSearchFoodPage = this.navigateSearchFoodPage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.backToManagerDashboard = this.backToManagerDashboard.bind(this);
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
        UserService.getUserBoard()
            .then(
                response => {
                    if (!response.data.role.name.localeCompare("Manager")) {
                        this.setState({
                            isManager: true,
                        });
                    }
                }
            );
    }
    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    backToManagerDashboard(e) {
        window.location = '/workingEmployee'
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
        window.location = `/food-view/${foodId}`
    }

    navigateSearchFoodPage(e) {      //search
        e.preventDefault();
        console.log("ddddd", this.state.foodNumber);
        let foodNumber = this.state.foodNumber;

        axios.get(`http://localhost:8100/food/search/${foodNumber}`)
            .then(response => {

                let id = response.data.data._id
                console.log("oop" + id)

                window.location = `/food-view/${id}`
            })
            .catch(error => {
                alert(error.message)
            })

    }

    navigateCreateFoodPage(e) {
        window.location = '/create-food'
    }

    navigateUpdateFoodPage(e, foodId) {                 //edit
        window.location = `/updateFood/${foodId}`
    }

    deleteFood(e, foodId) {
        console.log("I am on Delete", foodId)
        Swal.fire({
            title: 'Are you sure you want to delete this food?',
            text: "This item will be deleted immediently. You can't undo this action!",
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
                    'Food is successfully deleted.',
                    'success'
                )
            }
        })
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="row justify-content-center" id="dash-food">
                    <div className="container-dash">
                        <h2><b>Kitchen Head Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch" >

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/create-foodManagement" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Food Management</button></a>
                                            <a href="/kitchenHeadDashboard" className="routeBtn">  <button type="button" className="list-group-item list-group-item-action"  > Ingredient Order Management</button></a>

                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateFoodPage(e)}>Add New Food</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchFoodPage}>
                                            <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Enter Food number"
                                                aria-label="Search"
                                                name="foodNumber"
                                                value={this.state.foodNumber}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
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
                                                        <td>{item.foodName}</td>
                                                        <td>{item.category}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.createDate}</td>
                                                        <td>{item.status}</td>
                                                        <td>
                                                            {item.chefName.map((item, index) => (
                                                                <p id="food-tbl">{item.name}</p>
                                                            ))}
                                                        </td>
                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.viewFood(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.navigateUpdateFoodPage(e, item._id)}>Update</button></td>
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
                                    {this.state.isManager && (
                                        <button type="button" id="button" className="btn btn-secondary" onClick={e => this.backToManagerDashboard(e)}>Back to Manager Dashboard</button>
                                    )}
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

