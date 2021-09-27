import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from "sweetalert2";


const initialState = {
    selectedChef: '',
    id: '',
    orderNumber: '',
    ingredientName: '',
    quantity: '',
    options1: [],
    employees: [],
    chefName: '',
    chefValue: ''

}

class updateIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backtoIngredientOrder = this.backtoIngredientOrder.bind(this);
    }

    backtoIngredientOrder(e) {
        window.location = '/update-IngredientOrder/:id'
    }


    componentDidMount() {
        axios.get('http://localhost:8100/employee/workingChefs')
            .then(response => {
                this.setState({ employees: response.data.data }, () => {
                    let data = [];
                    this.setState({ options1: data });
                    this.state.employees.map((item, index) => {
                        let employees = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(employees)
                        console.log("a" + employees);
                    });
                    this.setState({ options1: data });

                })

            })

        const ingredient = this.props.match.params.id;
        console.log("bbb" + ingredient);
        axios.get(`http://localhost:8100/ingredient/${ingredient}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ orderNumber: response.data.data.orderNumber })
                this.setState({ ingredientName: response.data.data.ingredientName })
                this.setState({ quantity: response.data.data.quantity })
                this.setState({ chefName: response.data.data.chefName.name })
                this.setState({ chefValue: response.data.data.chefName._id })


                console.log("iiiii" + this.state.chefName)
                console.log("asd" + this.state.chefValue)
            })
            .catch(error => {
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange = selectedChef => {
        this.setState({ selectedChef });
        console.log('Option selected:', selectedChef);
    };

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. 
        const { data } = this.props.location;

        console.log("orderNo to send: " + data);
        localStorage.setItem('orderNumber', data);
        this.setState({ orderNumber: data });

        let ingredient = {
            orderNumber: data,
            ingredientName: this.state.ingredientName,
            quantity: this.state.quantity,
            chefName: this.state.selectedChef.value
        }
        console.log('DATA TO SEND', ingredient);

        axios.patch(`http://localhost:8100/ingredient/update/${this.state.id}`, ingredient)
            .then(response => {
                // alert('Food Data successfully updated')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated Ingredient details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                var data1 = localStorage.getItem('ingredientOrderId') || 1;
                window.location = `/update-IngredientOrder/${data1}`
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    render() {
        const { data } = this.props.location;
        console.log("orderNo1: " + data);
        const { selectedChef } = this.state.selectedChef;
        console.log("qqqqq " + this.state.selectedChef.label);

        let chefName = this.state.chefName;
        const chefValue = this.state.chefValue;

        console.log("rrrrrrrrrrr " + chefName);



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


                            <h2>Edit Ingredient Details</h2>
                            <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                            </h5>

                            <form onSubmit={this.onSubmit} >

                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="orderNumber" className="form-label">Ingredient Order Number</label>
                                            <br></br>
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
                                            <label htmlFor="ingredientName" className="form-label">Ingredient Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Ingredient Name"
                                                id="ingredientName"
                                                name="ingredientName"
                                                required
                                                value={this.state.ingredientName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="quantity" className="form-label">Quantity</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Quantity"
                                                id="quantity"
                                                name="quantity"
                                                required
                                                value={this.state.quantity}
                                                onChange={this.onChange}
                                            />
                                        </div>



                                        <div className="col-6">
                                            <label htmlFor="selectedChef" className="form-label">Chef Name</label>

                                            <Select
                                                defaultValue={{ label: chefName, value: chefValue }}
                                                placeholder="Select Chef Name"
                                                className="basic-single"
                                                name="selectedChef"
                                                options={this.state.options1}
                                                value={selectedChef}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <br />



                                <div className="mb-3">
                                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrder(e)}>Back</button>
                                    <button type="submit" id="form-button" className="btn btn-warning">Edit ingredient</button>
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

export default updateIngredient;