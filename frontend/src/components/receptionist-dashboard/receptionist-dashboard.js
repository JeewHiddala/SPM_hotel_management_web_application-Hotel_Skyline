import React, { Component } from 'react';
import '../receptionist-dashboard/dashboard.css';
import AuthService from "../../services/auth.service";

class ReceptionistDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /*showModeratorBoard: false,
            showAdminBoard: false,*/
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                isReception: !(user.role.localeCompare("reception"))
            });
        }
    }
    render() {
        const { isReception } = this.state;
        return (
            <div>
                <br /><br />
                {isReception ? (
                    <div class="row justify-content-center">
                        <div class="container-dash">
                            <h2><b>Receptionist Dashboard</b></h2>
                            <div class="row justify-content-evenly">
                                <div class="col-3">

                                    <div class="row">
                                        <div class="container" >
                                            <h3 class="h3"><b>Creations</b></h3>
                                            <div class="list-group">
                                                <button type="button" class="list-group-item list-group-item-action">Check Available Rooms</button>
                                                <button type="button" class="list-group-item list-group-item-action" >
                                                    Room Booking Management
                                                </button>
                                                <button type="button" class="list-group-item list-group-item-action">Employee Leaves</button>
                                                <button type="button" class="list-group-item list-group-item-action">Employee Attendance</button>
                                                <button type="button" class="list-group-item list-group-item-action">Food Ordering</button>
                                                <button type="button" class="list-group-item list-group-item-action">Service List Bill</button>
                                                <button type="button" class="list-group-item list-group-item-action active" aria-current="true">Checkout Handling</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br /><br /><br /><br />
                                </div>
                                <div class="col-8">
                                    <div class="container" >
                                        <div class="float-end">
                                            <button type="button" class="btn btn-success">Create Checkout Bill</button>
                                        </div>

                                        <div class="float-end">
                                            <form class="d-flex">
                                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                                <button class="btn btn-primary" type="submit">Search</button>
                                            </form>
                                        </div>
                                        <div class="col-4">
                                            <h3 class="h3"><b>Checkout Handling</b></h3>
                                        </div>

                                        <br />
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Booking No</th>
                                                        <th>Service Bill No</th>
                                                        <th>Receptionist ID</th>
                                                        <th>Issued Date</th>
                                                        <th>Total Bill Value</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><button type="button" class="btn btn-primary">View</button></td>
                                                        <td><button type="button" class="btn btn-warning">Update</button></td>
                                                        <td><button type="button" class="btn btn-danger">Delete</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <header className="jumbotron">
                            <h3>Require Receptionist Role! </h3>
                        </header>
                    </div>
                )}


                
            </div>
        )
    }
}

export default ReceptionistDashboard;