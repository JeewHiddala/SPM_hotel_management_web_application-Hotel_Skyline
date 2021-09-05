import React, { Component } from 'react';
//import axios from 'axios';

const initialState = {
    orderNumber: '',
    createdDate: ''

}


class IngredientOrder extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
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
            <div className="container"><br />

                <h2>Add New Ingredient Order</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
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

                            <div className="mb-3">
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
                            <br />



                            <button id="form-button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrderManagement(e)}>Back</button>
                            <button id="form-button" onClick={e => this.addIngredient(e, this.state.orderNumber)} className="btn btn-primary">Add New Ingredient</button>
                        </div>
                    </div>
                    <br>
                    </br>
                    <br></br>
                    <br></br>
                </form>


            </div>
        )
    }
}

export default IngredientOrder;