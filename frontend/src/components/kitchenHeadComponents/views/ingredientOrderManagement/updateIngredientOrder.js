import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


const initialState = {
    orderNumber: '',
    createdDate: '',
    id: '',
    ingredients: []

}

class updateIngredientOrder extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.deleteIngredient = this.deleteIngredient.bind(this);
        this.updateIngredient = this.updateIngredient.bind(this);


        this.backtoIngredientOrderManagement = this.backtoIngredientOrderManagement.bind(this);
    }

    updateIngredient(e, ingredientId) {
        window.location = `/update-Ingredient/${ingredientId}`
    }

    backtoIngredientOrderManagement(e) {
        window.location = '/kitchenHeadDashboard'
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    deleteIngredient(e, ingredientId) {
        console.log("I am on Delete", ingredientId)
        Swal.fire({
            title: 'Are you sure you want to delete this Ingredient Order?',
            text: "This item will be deleted immediately. You can't undo this action!",
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
                    'Ingredient Order has been deleted.',
                    'success'
                )
                window.location.reload(false);
            }
        })
    }

    componentDidMount() {

        var data1 = localStorage.getItem('ingredientOrderId') || 1;

        axios.get(`http://localhost:8100/ingredientOrder/${data1}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ orderNumber: response.data.data.orderNumber });
                this.setState({ createdDate: response.data.data.createdDate });
                this.setState({ ingredients: response.data.data.ingredients });

                console.log("mmm" + response.data.data)
            })
            .catch(error => {
                alert(error.message)
            })
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. 
        let ingredientOrder = {
            orderNumber: this.state.orderNumber,
            createdDate: this.state.createdDate,
            ingredients: this.state.ingredients,
        }
        console.log('DATA TO SEND', ingredientOrder);

        axios.patch(`http://localhost:8100/ingredientOrder/update/${this.state.id}`, ingredientOrder)
            .then(response => {
                // alert('Food Data successfully updated')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated ingredientOrder details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
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

                            <h2>Edit Ingredient Order Details</h2>

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
                                                disabled
                                                onChange={this.onChange}

                                            />
                                        </div>
                                    </div>
                                    <br />


                                    <br></br>

                                    <h5><p><b>Ingredient Order List</b></p></h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Ingredient Name</th>
                                                    <th>Quantity</th>
                                                    <th>Chef Name</th>
                                                    <th></th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ingredients.length > 0 && this.state.ingredients.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.ingredientName}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.chefName.name}</td>

                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.updateIngredient(e, item._id)}>Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteIngredient(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrderManagement(e)}>Back</button>
                                    <button type="submit" id="form-button" className="btn btn-warning" >Update Ingredient Order </button>
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
export default updateIngredientOrder;