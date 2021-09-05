// import './createBooking.css';
// import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
// import image from '../images/w1.jpg';
// import CheckoutSteps from '../checkoutSteps/checkoutSteps';



const initialState = {

    orderId: '',
    foodName: '',
    quantity: 0,
    price: 0,
    pricenquantity: 0,
    totalPrice: 0
}

class createFoodOrder extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onEditorSelect = this.onEditorSelect.bind(this);
        //  this.onAdminSelect = this.onAdminSelect.bind(this);
        this.state = initialState;
    }

    // componentDidMount() {
    //     axios.get('http://localhost:7000/editor/')
    //         .then(response => {
    //             this.setState({ editors: response.data.data }, () => {
    //                 let data = [];
    //                 this.state.editors.map((item, index) => {
    //                     let editors = {
    //                         value: item._id,
    //                         label: item.name
    //                     }
    //                     data.push(editors)
    //                     console.log("a" + editors);
    //                 });
    //                 this.setState({ options1: data });
    //             })
    //         })

    // }

    // componentDidMount(){
    //     axios.get(`http://localhost:8100/foodorder/cal/${this.props.match.params.id}`)
    //     .then(response => {
    //       this.setState({totalPrice: totalPrice})
    //     })
    //     .catch(error => {
    //       alert(error.message)
    //     })
    // }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // onEditorSelect(e) {
    //     this.setState({ selectedEditors: e ? e.map(item => item.value) : [] });
    // }

    calculate() {
        return (
            this.totalPrice = this.price * this.quantity);
    }

    backtofoodorder(e) {
        window.location = '/foodorder'
    }


    onSubmit(e) {
        e.preventDefault();

        let foodorder = {
            orderId: this.state.orderId,
            foodName: this.state.foodName,
            price: this.state.price,
            quantity: this.state.quantity,
            pricenquantity: this.state.pricenquantity,
            totalPrice: this.state.price * this.state.quantity,



        };

        console.log('DATA TO SEND', foodorder);
        axios.post('http://localhost:8100/foodorder/create', foodorder)
            .then(response => {
                alert('Food Ordering Success')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }




    render() {
        return (
            <div className="container-box"><br />

                <h2>Create Food Order</h2>

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
                            <br></br>
                            <h2>Total price for the order {this.state.orderId} : Rs.{this.state.price * this.state.quantity}</h2>
                            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtofoodorder(e)}> Back</button>
                            <button type="submit" id="form-button" className="btn btn-primary">Submit</button>
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

export default createFoodOrder;