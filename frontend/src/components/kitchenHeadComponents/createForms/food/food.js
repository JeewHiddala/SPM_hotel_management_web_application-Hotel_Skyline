import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

const initialState = { //initiate states
    selectedChef: [],
    foodNumber: '',
    foodName: '',
    category: '',
    price: '',
    description: '',
    createDate: '',
    status: 'Available',
    options1: [],
    options2: [],
    options3: [],
    employees: []

}

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this); //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);//bind onSubmit function.
        this.onChefNameSelect = this.onChefNameSelect.bind(this); //bind chefName function.
        this.backtoFoodManagement = this.backtoFoodManagement.bind(this);

    }

    backtoFoodManagement(e) {
        window.location = '/create-foodManagement'
    }


    componentDidMount() {
        axios.get('http://localhost:8100/employee/')
            .then(response => {
                this.setState({ employees: response.data.data }, () => {
                    let data = [];
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

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChefNameSelect(e) {
        this.setState({ selectedChef: e ? e.map(item => item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault(); //avoid browser refresh

        let food = {
            foodNumber: this.state.foodNumber,
            foodName: this.state.foodName,
            category: this.state.category,
            price: this.state.price,
            description: this.state.description,
            createDate: this.state.createDate,
            status: this.state.status,
            chefName: this.state.selectedChef
        }
        console.log('DATA TO SEND', food);
        axios.post('http://localhost:8100/food/create', food)
            .then(response => {
                alert('Data successfully inserted')
                console.log("a");
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
                                        <a href="/create-foodManagement" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Food Management</button></a>
                                        <a href="/kitchenHeadDashboard" className="routeBtn">  <button type="button" className="list-group-item list-group-item-action"  > Ingredient Order Management</button></a>

                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <br /><br /><br /><br />
                        </div>
                        <div className="col-8 align-self-stretch">
                            <div className="container"></div>

                            <h2>Add New Food</h2><br></br>
                            <form onSubmit={this.onSubmit} >

                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="foodNumber" className="form-label">Food Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Food Number"
                                                id="foodNumber"
                                                name="foodNumber"
                                                pattern="[A-Z]{1}[0-9]{5}"
                                                maxLength="6"
                                                required
                                                value={this.state.foodNumber}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="col-6" style={{ textAlign: "left" }}>
                                            <label htmlFor="foodName" className="form-label">Food Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Food Name"
                                                id="foodName"
                                                name="foodName"
                                                required
                                                value={this.state.foodName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-6" style={{ textAlign: "left" }}>
                                            <label htmlFor="category" className="form-label">Category</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Food Category"
                                                id="category"
                                                name="category"
                                                required
                                                value={this.state.category}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="col-6" style={{ textAlign: "left" }}>
                                            <label htmlFor="price" className="form-label">Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Food Price"
                                                id="price"
                                                name="price"
                                                required
                                                value={this.state.price}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3" style={{ textAlign: "left" }}>
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            placeholder="Enter Food Description"
                                            required
                                            value={this.state.description}
                                            onChange={this.onChange}
                                        >
                                        </textarea>

                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-6" style={{ textAlign: "left" }}>
                                            <label htmlFor="createDate" className="form-label"> Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="createDate"
                                                name="createDate"
                                                required
                                                value={this.state.createDate}
                                                onChange={this.onChange}

                                            />
                                        </div>


                                        <div className="col-6" style={{ textAlign: "left" }}>
                                            <label htmlFor="status" className="form-label">Status</label><br></br>
                                            <select className="mb-3" id="lang"
                                                className="form-select"
                                                onChange={this.onChange}
                                                value={this.state.status}
                                                name="status"
                                            >
                                                <option value="Available">Available </option>
                                                <option value="Unavailable">Unavailable</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-6" style={{ textAlign: "left" }}>
                                        <label htmlFor="status" className="form-label">Select Chef Name</label><br></br>
                                        <Select
                                            placeholder="Select Chef Name"
                                            options={this.state.options1}
                                            onChange={this.onChefNameSelect}
                                            className="basic-multi-select"
                                            value={this.state.chefName}
                                            isMulti
                                        />
                                    </div>
                                    <br />


                                    <br></br>
                                    <br></br>
                                    <div className="mb-3">
                                        <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoFoodManagement(e)}>Back</button>
                                        <button type="submit" id="form-button" className="btn btn-success" onClick={e => this.backtoFoodManagement(e)}>Add New Food</button>
                                    </div>
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

export default Food;