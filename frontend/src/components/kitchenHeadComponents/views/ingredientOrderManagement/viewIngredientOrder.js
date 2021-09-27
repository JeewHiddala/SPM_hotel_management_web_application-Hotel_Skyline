import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

class ViewIngredientOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            orderNumber: '',
            createdDate: 0
        }
        this.backtoIngredientOrderManagement = this.backtoIngredientOrderManagement.bind(this);
    }

    backtoIngredientOrderManagement(e) {
        window.location = '/kitchenHeadDashboard'
    }


    navigateKitchenHeadDashboard(e) {
        window.location = '/kitchenHeadDashboard'
    }
    componentDidMount() {
        const data = this.props.match.params.id;
        console.log("rrrr" + data);

        axios.get(`http://localhost:8100/ingredientOrder/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ orderNumber: response.data.data.orderNumber });
                this.setState({ createdDate: response.data.data.createdDate });
                this.setState({ ingredients: response.data.data.ingredients });

            })
    }
    render() {
        return (
            <div>
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

                                <h2> Ingredient Order Details</h2>

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
                                                    disabled
                                                    onChange={this.onChange}

                                                />
                                            </div>
                                        </div>
                                        <br />

                                        <h5><p><b>Ingredient Order List</b></p></h5>


                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>Ingredient Name</th>
                                                        <th>Quantity</th>
                                                        <th>Chef Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.ingredients.length > 0 && this.state.ingredients.map((item, index) => (
                                                        <tr key={index}>

                                                            <td>{item.ingredientName}</td>
                                                            <th>{item.quantity}</th>
                                                            <td>{item.chefName.name}</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                        <br></br>
                                        <button type="button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrderManagement(e)}>Back</button>


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
            </div>
        )
    }
}

export default ViewIngredientOrder;