import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Select from 'react-select';
import '../../../css/dash.css';



const initialState = {      //initiate states
    foodNumber: '',
    foodName: '',
    category: '',
    description: '',
    status: '',
    createDate: '',
    options1: [],
    options2: [],
    options3: [],
    selectedChef: [],
    price: 0,
    employees: []
}

class updateFood extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.onChefNameSelect = this.onChefNameSelect.bind(this);

        this.backtoFoodManagement = this.backtoFoodManagement.bind(this);
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    backtoFoodManagement(e) {
        window.location = '/create-foodManagement'
    }

    onChefNameSelect(e) {
        this.setState({ selectedChef: e ? e.map(item => item.value) : [] });
    }

    componentDidMount() {
        const food = this.props.match.params.id;
        console.log("cccc" + food);
        axios.get(`http://localhost:8100/food/${food}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ foodNumber: response.data.data.foodNumber })
                this.setState({ foodName: response.data.data.foodName })
                this.setState({ category: response.data.data.category })
                this.setState({ price: response.data.data.price })
                this.setState({ description: response.data.data.description })
                this.setState({ createDate: response.data.data.createDate })
                this.setState({ status: response.data.data.status })
                this.setState({ chefName: response.data.data.selectedChef })

                console.log("tttt" + response.data.data)
            })
            .catch(error => {
                alert(error.message)
            })

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
                        console.log("abc" + employees);
                    });
                    this.setState({ options1: data });
                })
            })
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. 
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

        axios.patch(`http://localhost:8100/food/update/${this.state.id}`, food)
            .then(response => {
                // alert('Food Data successfully updated')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated Food details has been saved',
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
                            <h2>Update Food Details</h2>

                            <form onSubmit={this.onSubmit}>
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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                                    <div className="col-6" style={{ textAlign: "left" }}>
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
                                    <br></br>
                                    <div className="row mb-3">
                                        <div className="col-6" style={{ textAlign: "left" }}>
                                            <label htmlFor="createDate" className="form-label"> Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="createDate"
                                                name="createDate"
                                                disabled
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
                                        <button type="submit" id="form-button" className="btn btn-success" >Update Food </button>
                                    </div>
                                </div>
                                <br>
                                </br>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default updateFood;