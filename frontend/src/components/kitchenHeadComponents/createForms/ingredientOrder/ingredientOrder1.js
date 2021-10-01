import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

const initialState = {
    orderNumber: '',
    createdDate: '',
    ingredients: [],
    chef: []
}


class IngredientOrder1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
        this.backtoIngredientOrderManagement = this.backtoIngredientOrderManagement.bind(this);
        this.backtoIngredientOrderManagementDash = this.backtoIngredientOrderManagementDash.bind(this);
    }


    backtoIngredientOrderManagement(e) {
        window.location = '/create-ingredient'
    }

    backtoIngredientOrderManagementDash(e) {
        window.location = '/kitchenHeadDashboard'
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addIngredient(e, orderNo) {
        console.log("orderNo: " + orderNo);
        this.props.history.push({
            pathname: '/create-ingredient',
            data: `${orderNo}`
        })
    }

    onSubmit(e) {
        e.preventDefault();

        let ingredientOrder = {
            orderNumber: this.state.orderNumber,
            createdDate: this.state.createdDate,
            ingredients: this.state.ingredients,

        }
        console.log('DATA TO SEND', ingredientOrder);
        axios.post('http://localhost:8100/ingredientOrder/create', ingredientOrder)
            .then(response => {
                alert('Data successfully inserted')
                console.log("a");
            })

            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })


    }
    componentDidMount() {
        var data = localStorage.getItem('orderNumber') || 1;
        var data1 = localStorage.getItem('createdDate') || 1;
        this.setState({ createdDate: data1 });


        console.log("ing ord no" + data);
        axios.get(`http://localhost:8100/ingredient/get-ingredients-in-order/${data}`)
            .then(response => {
                this.setState({ ingredients: response.data.data })
            })
        this.setState({ orderNumber: data });
    }

    deleteIngredient(e, ingredientId) {
        console.log("I am on Delete", ingredientId)
        Swal.fire({
            title: 'Are you sure you want to delete this Ingredient?',
            text: "This item will be deleted immediently. You can't undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/ingredient/${ingredientId}`)

                Swal.fire(
                    'Deleted!',
                    'Ingredient is successfully deleted.',
                    'success'
                )
                window.location.reload(false);
            }
        })
    }
    render() {
        const { data } = this.props.location;
        return (

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
                                    <br></br>
                                </div>
                            </div>
                            <br /><br /><br /><br />
                        </div>
                        <div className="col-8 align-self-stretch">
                            <div className="container"></div>

                            <h2>Create New Ingredient Order</h2>
                            <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                            </h5>

                            <form onSubmit={this.onSubmit} >

                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="orderNumber" className="form-label">Ingredient Order Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="orderNumber"
                                                name="orderNumber"
                                                value={this.state.orderNumber}
                                                disabled
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="createdDate" className="form-label">Created Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="createdDate"
                                                name="createdDate"
                                                value={this.state.createdDate}
                                                onChange={this.onChange}

                                            />
                                        </div>
                                    </div>
                                    <br />

                                    <button onClick={e => this.addIngredient(e, this.state.orderNumber)} className="btn btn-primary">Add new Ingredient</button>
                                    <br></br>
                                    <br></br><br></br>

                                    <h5><p><b>Ingredient Order List</b></p></h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Ingredient Name</th>
                                                    <th>Quantity</th>
                                                    <th>Chef Name</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ingredients.length > 0 && this.state.ingredients.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.ingredientName}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.chefName.name}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteIngredient(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                    <br></br>
                                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrderManagement(e)}>Back</button>
                                    <button type="submit" id="form-button" className="btn btn-success" onClick={e => this.backtoIngredientOrderManagementDash(e)}>Create New Ingredient Order</button>

                                </div>
                                <br>
                                </br>
                                <br></br>
                                <br></br>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IngredientOrder1;