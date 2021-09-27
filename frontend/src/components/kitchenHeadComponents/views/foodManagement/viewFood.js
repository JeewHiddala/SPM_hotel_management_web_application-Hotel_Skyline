import React, { Component } from 'react';
import axios from 'axios';

class ViewFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      foodNumber: '',
      foodName: '',
      category: '',
      price: '',
      description: '',
      createDate: '',
      status: '',
      chefName: '',
    }

    this.backtoFoodManagement = this.backtoFoodManagement.bind(this);

  }



  componentDidMount() {
    const data = this.props.match.params.id;
    console.log("rrrr" + data);
    axios.get(`http://localhost:8100/food/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data.data)

        this.setState({ foodNumber: response.data.data.foodNumber });
        this.setState({ foodName: response.data.data.foodName });
        this.setState({ category: response.data.data.category });
        this.setState({ price: response.data.data.price });
        this.setState({ description: response.data.data.description });
        this.setState({ createDate: response.data.data.createDate });
        this.setState({ status: response.data.data.status });
        this.setState({ chefName: response.data.data.chefName });
      })

  }

  backtoFoodManagement(e) {
    window.location = '/create-foodManagement'
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
              <h2>Food Details</h2>
              <form onSubmit={this.onSubmit} >

                <div className="container">
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="foodNumber" className="form-label">Food Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="foodNumber"
                        name="foodNumber"
                        value={this.state.foodNumber}
                        disabled
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="col-6" style={{ textAlign: "left" }}>
                      <label htmlFor="foodName" className="form-label">Food Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="foodName"
                        name="foodName"
                        value={this.state.foodName}
                        disabled
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
                        id="category"
                        name="category"
                        value={this.state.category}
                        disabled
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="col-6" style={{ textAlign: "left" }}>
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={this.state.price}
                        disabled
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
                      value={this.state.description}
                      disabled
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
                        value={this.state.createDate}
                        disabled
                        onChange={this.onChange}

                      />
                    </div>


                    <div className="col-6" style={{ textAlign: "left" }}>
                      <label htmlFor="status" className="form-label">Status</label>
                      <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={this.state.status}
                        disabled
                        onChange={this.onChange}
                      />
                    </div>
                  </div>

                  <br></br>
                  <div className="mb-3">
                    <button type="button" className="btn btn-secondary" onClick={e => this.backtoFoodManagement(e)}>Back</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default ViewFood;