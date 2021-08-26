import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

class ViewIngredientOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
           ingredients: [],
           orderNumber:'',
           createdDate:''
          }     
          this.backtoIngredientOrderManagement = this.backtoIngredientOrderManagement.bind(this);
          this.deleteIngredient = this.deleteIngredient.bind(this);
}


deleteIngredient(e, ingredientId) {
    console.log("I am on Delete", ingredientId)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
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
                'Ingredient has been deleted.',
                'success'
            )
           window.location.reload(false);
        }
    })
}

backtoIngredientOrderManagement(e) {
    window.location = '/kitchenHeadDashboard'
  }
  

navigateKitchenHeadDashboard(e){
    window.location = '/kitchenHeadDashboard'  
}
    componentDidMount(){
        const data = this.props.match.params.id;
        console.log("rrrr" + data);
        
        axios.get(`http://localhost:8100/ingredientOrder/${this.props.match.params.id}`)
        .then(response => {
            this.setState({ orderNumber: response.data.data.orderNumber });
            this.setState({ createdDate: response.data.data.createdDate });
            this.setState({ ingredients: response.data.data.ingredients});


        })
        
      }
    
   
      
    render() {
        return (
            <div className="container"><br />

                <h2> Ingredient Order Details</h2>
                <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

                </h5>

                <form onSubmit={this.onSubmit} >

                    <div className={"row"}>
                        <div className={"col-md-6"}>


                            <div className="mb-3" style={{ textAlign: "left" }}>
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

                            <div className="mb-3">
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
                            <br />

                            <h5><p><b>Ingredient Order List</b></p></h5>
                          

                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Ingredient Name</th>
                                            <th>Quantity</th>
                                            <th>Chef Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ingredients.length > 0 && this.state.ingredients.map((item, index) => (
                                            <tr key={index}>

                                                <td>{item.ingredientName}</td>
                                                <th>{item.quantity}</th>
                                                <td>{item.chefName.name}</td>
                                                <td><button type="button" className="btn btn-danger" onClick={e => this.deleteIngredient(e, item._id)}>Delete</button></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <br></br>
                            <button type="button" className="btn btn-secondary" onClick={e => this.backtoIngredientOrderManagement(e)}>Back</button>
                           
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

export default ViewIngredientOrder;