import React, { Component } from 'react';
import '../../../css/dash.css'

const initialState = { //initiate states
    orderNumber: '',
    createdDate: ''
}


class IngredientOrder extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.backtoIngredientOrderManagement = this.backtoIngredientOrderManagement.bind(this);
    }

    backtoIngredientOrderManagement(e) {
        window.location = '/kitchenHeadDashboard'
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    addIngredient(e, orderNo, id) {
        if ((orderNo === '')) {
            alert('Please enter Ingrediet order number!');

        } else {
            localStorage.setItem('createdDate', this.state.createdDate);
            this.props.history.push({
                pathname: '/create-ingredient/${id}',
                data: `${orderNo}`
            })
        }
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
                            <h2>Add New Ingredient Order</h2><br />

                            <div className="container"></div>

                            <form >

                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="orderNumber" className="form-label">Ingredient Order Number</label><br>
                                            </br>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Ingredient Order Number"
                                                id="orderNumber"
                                                name="orderNumber"
                                                pattern="[A-Z]{2}[0-9]{5}"
                                                maxLength="7"
                                                value={this.state.orderNumber}
                                                onChange={this.onChange}
                                                required
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


                                    <br />
                                    <button id="form-button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrderManagement(e)}>Back</button>
                                    <button id="form-button" onClick={e => this.addIngredient(e, this.state.orderNumber)} className="btn btn-success">Add New Ingredient</button>

                                </div>
                                <br>
                                </br>
                                <br></br><br></br>
                                <br></br>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IngredientOrder;