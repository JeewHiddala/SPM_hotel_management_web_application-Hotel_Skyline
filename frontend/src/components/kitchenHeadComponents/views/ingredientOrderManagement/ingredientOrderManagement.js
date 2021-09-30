import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import UserService from "../../../../services/user.service";

class IngredientOrderManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            orderNumber: '',
            ingredientOrders: [],
            isManager: false
        }
        this.deleteIngredientOrder = this.deleteIngredientOrder.bind(this);
        this.navigateCreateIngredientOrderPage = this.navigateCreateIngredientOrderPage.bind(this);
        this.navigateUpdateIngredientOrderPage = this.navigateUpdateIngredientOrderPage.bind(this);
        this.backToManagerDashboard = this.backToManagerDashboard.bind(this);
        this.navigateSearchIngredientOrderPage = this.navigateSearchIngredientOrderPage.bind(this);
        this.onChange = this.onChange.bind(this);


    }

    componentDidMount() {
        axios.get('http://localhost:8100/ingredientOrder/')
            .then(response => {
                this.setState({ ingredientOrders: response.data.data });
                console.log("abc", response.data.data);
                console.log("fffff", this.state.ingredientOrders);

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

    navigateSearchIngredientOrderPage(e) {      //search
        e.preventDefault();
        console.log("nnnn", this.state.orderNumber);
        let orderNumber = this.state.orderNumber;

        axios.get(`http://localhost:8100/ingredientOrder/search/${orderNumber}`)
            .then(response => {

                let id = response.data.data._id
                console.log("oop" + id)

                window.location = `/ingredientOrder-View/${id}`
            })
            .catch(error => {
                alert(error.message)
            })

    }

    ViewIngredientOrder(e, ingredientOrderId) {
        this.props.history.push({
            pathname: `/ingredientOrder-View/${ingredientOrderId}`,
            data: `${ingredientOrderId}`
        });

    }

    navigateUpdateIngredientOrderPage(e, ingredientOrderId) {      //edit
        localStorage.setItem('ingredientOrderId', ingredientOrderId);

        window.location = `/update-IngredientOrder/${ingredientOrderId}`
    }

    navigateCreateIngredientOrderPage(e) {
        window.location = '/create-ingredientOrder'
    }

    deleteIngredientOrder(e, ingredientId) {
        console.log("I am on Delete", ingredientId)
        Swal.fire({
            title: 'Are you sure you want to delete this Ingredient Order?',
            text: "This item will be deleted immediently. You can't undo this action!",
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
                    'Ingredient Order is successfully deleted.',
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
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/create-foodManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Management</button></a>
                                            <a href="/kitchenHeadDashboard" className="routeBtn">  <button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true"> Ingredient Order Management</button></a>


                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" class="btn btn-success" onClick={e => this.navigateCreateIngredientOrderPage(e)}>Add New Ingredient Order</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchIngredientOrderPage}>
                                            <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Enter Ingredient Order number"
                                                aria-label="Search"
                                                name="orderNumber"
                                                value={this.state.orderNumber}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
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

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ingredientOrders.length > 0 && this.state.ingredientOrders.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.orderNumber}</td>
                                                        <td>
                                                            {item.ingredients.map((item, index) => (
                                                                <p id="food-tbl">{item.ingredientName}</p>

                                                            ))}
                                                        </td>
                                                        <td>
                                                            {item.ingredients.map((item, index) => (
                                                                <p id="food-tbl">{item.quantity}</p>
                                                            ))}
                                                        </td>

                                                        <td>
                                                            {item.ingredients.map((item, index) => (
                                                                <p id="food-tbl">{item.chefName.name}</p>
                                                            ))}
                                                        </td>
                                                        <td>{item.createdDate}</td>

                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.ViewIngredientOrder(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.navigateUpdateIngredientOrderPage(e, item._id)}>Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteIngredientOrder(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
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

export default IngredientOrderManagement;