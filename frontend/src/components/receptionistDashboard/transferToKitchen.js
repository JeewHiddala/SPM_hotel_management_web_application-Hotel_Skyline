import './createBooking.css';
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';

const initialState = {

    orderId: '',
    foodName: '',
    quantity: 0,
    price: 0,
    totalPrice: 0,

}

class transferToKitchen extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }


    componentDidMount() {


        const { data } = this.props.location

        console.log("userid: " + data);
        axios.get(`http://localhost:8100/foodorder/${data}`)
            .then(response => {
                this.setState({ foodorder: response.data.data });
                this.setState({ orderId: response.data.data.orderId });
                this.setState({ foodName: response.data.data.foodName });
                this.setState({ quantity: response.data.data.quantity });
                this.setState({ price: response.data.data.price });
                this.setState({ totalPrice: response.data.data.totalPrice });

                console.log("abc" + response.data.data.title);
            })
    }

    backtofoodorder(e) {
        window.location = '/foodorder'
    }


    transfer() {

        const { data } = this.props.location

        console.log("userid: " + data);
        let foodorder = {
            orderId: this.state.orderId,
            foodName: this.state.foodName,
            quantity: this.state.quantity,
            price: this.state.price,
            totalPrice: this.state.totalPrice,

        };
        console.log('DATA TO SEND', foodorder);
        Swal.fire({
            title: "Transfer to Kitchen!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Transfer!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:8100/kitchenorder/create', foodorder)
                    .then(response => {
                        Swal.fire(
                            'Transfer!',
                            'success'
                        )
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            }
        })

    }


    render() {
        return (
            <div className="container"><br />

                <h2>Kitchen Transfering Food Order Details</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="orderId" className="form-label">Order Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="orderId"
                                    name="orderId"
                                    value={this.state.orderId}
                                    onChange={this.onChange}
                                />
                            </div>



                            <div className="mb-3">
                                <label htmlFor="foodName" className="form-label">Food Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="foodName"
                                    name="foodName"
                                    value={this.state.foodName}
                                    onChange={this.onChange}

                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChange}

                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChange}

                                />
                            </div>



                            <div className="mb-3">
                                <label htmlFor="totalPrice" className="form-label">TotalPrice</label>
                                <input
                                    className="form-control"
                                    id="totalPrice"
                                    name="totalPrice"
                                    value={this.state.price * this.state.quantity}

                                    onChange={this.onChange}
                                >
                                </input>
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={e => this.backtofoodorder(e)}> Back</button>

                            <button type="button" className="btn btn-primary" onClick={() => this.transfer()}>Transfer</button>
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

export default transferToKitchen;