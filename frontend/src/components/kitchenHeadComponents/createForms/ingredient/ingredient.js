import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';



const initialState = {
    selectedChef: '',
    id: '',
    orderNumber: '',
    ingredientName: '',
    quantity: '',
    options1: [],
    employees: []

}

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backtoIngredientOrder = this.backtoIngredientOrder.bind(this);
    }

    backtoIngredientOrder(e) {
        window.location = '/create-ingredientOrder'
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


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    // onChangeSelect(e) {
    //     this.setState({ selectedChef: e.target.value });
    // }
    handleChange = selectedChef => {
        this.setState({ selectedChef });
        console.log('Option selected:', selectedChef);
    };
    onSubmit(e) {
        e.preventDefault();
        const { data } = this.props.location;
        //this.setState({ orderNumber: orderNo });
        console.log("orderNo to send: " + data);

        localStorage.setItem('orderNumber', data);
        this.setState({ orderNumber: data });

        let ingredient = {
            orderNumber: data,
            ingredientName: this.state.ingredientName,
            quantity: this.state.quantity,
            chefName: this.state.selectedChef.value,
        }
        console.log('DATA TO SEND', ingredient);

        axios.post('http://localhost:8100/ingredient/create', ingredient)
            .then(response => {
                this.props.history.push({
                    pathname: '/create-ingredientOrder-continue',
                    data: response.data.data.orderNumber
                })
                alert('Data successfully inserted')
                console.log("added");
            })

            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }


    render() {
        const { data } = this.props.location;
        //this.setState({ orderNumber: orderNo });
        console.log("orderNo1: " + data);
        const { selectedChef } = this.state.selectedChef;

        return (
            <div className="container"><br />

                <h2>Add Ingredient to Ingredient Order</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="orderNumber" className="form-label">Ingredient Order Number</label>   
                            <br></br>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="orderNumber"
                                    name="orderNumber"
                                    value={data}
                                    disabled
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="ingredientName" className="form-label">Ingredient Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ingredientName"
                                    name="ingredientName"
                                    value={this.state.ingredientName}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="mb-3" style={{ textAlign: "left" }}>
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.onChange}
                                />
                            </div>




                            <label htmlFor="selectedChef" className="form-label">Chef Name</label>

                            <Select
                                placeholder="Select Chef Name"
                                className="basic-single"
                                name="selectedChef"
                                options={this.state.options1}
                                value={selectedChef}
                                onChange={this.handleChange}
                            />
                            </div>
                            </div>
                            <br />

                            <br />


                         
                            <div className="mb-3">
                            <button type="button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrder(e)}>Back</button>
                            <button type="submit" className="btn btn-primary">Add ingredient</button>
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

export default Ingredient;