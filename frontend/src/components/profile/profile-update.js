import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import axios from 'axios';
import Swal from "sweetalert2";
import profile from '../../images/profile-avatar.png';

import './profile-styles.css';

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: null,
            employee: null,
            id: '',
            name: '',
            password: '',
            cpassword: '',
            email: '',
            mobileNumber: '',
            userName: '',
            address: '',
            position: '',
            nicNo: '',
            salary: '',
            role: "",
            image: "",
            currentUser: AuthService.getCurrentUser()
        };
        this.back = this.back.bind(this);
        this.UpdateProfile = this.UpdateProfile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateUpdateImage = this.navigateUpdateImage.bind(this);

    }

    componentDidMount() {
        console.log("aaa", this.state.currentUser);
        UserService.getProfileImage()
        .then(
          response => {
            console.log("pic", response.data.pic);
            if (response.data.pic) {
              this.setState({ image: response.data.pic })
            } else {
              this.setState({ image: profile })
            }
          });

        UserService.getUserBoard()
            .then(
                response => {
                    console.log("fffffff", response.data.role.name);
                    this.setState({ role: response.data.role.name });
                    if (response.data.role.name === "customer") {
                        axios.get(`http://localhost:8100/customer/get-customer/${this.state.currentUser.id}`)
                            .then(response => {
                                this.setState({ customer: response.data.data })
                            })
                            .then(() => {
                                console.log(this.state.customer)
                                this.setState({ id: this.state.customer._id });
                                this.setState({ name: this.state.customer.fullname });
                                this.setState({ email: this.state.customer.email });
                                this.setState({ mobileNumber: this.state.customer.mobileNumber });
                                this.setState({ userName: this.state.customer.userName });
                                this.setState({ address: this.state.customer.address });
                                this.setState({ nicNo: this.state.customer.nicNo });
                                this.setState({ password: this.state.customer.password });
                            });
                    } else {
                        axios.get(`http://localhost:8100/employee/get-employee/${this.state.currentUser.id}`)
                            .then(response => {
                                this.setState({ employee: response.data.data })
                            })
                            .then(() => {
                                console.log("aa", this.state.employee)
                                this.setState({ id: this.state.employee._id });
                                this.setState({ name: this.state.employee.name });
                                this.setState({ email: this.state.employee.email });
                                this.setState({ mobileNumber: this.state.employee.mobileNumber });
                                this.setState({ userName: this.state.employee.userName });
                                this.setState({ position: this.state.employee.position });
                                this.setState({ salary: this.state.employee.salary });
                                this.setState({ nicNo: this.state.employee.nicNo });
                                this.setState({ password: this.state.employee.password });
                            });
                    }

                },
                error => {
                    this.setState({
                        content:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    UpdateProfile(e) {
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        if (this.state.customer) {
            if (this.state.password.localeCompare(this.state.customer.password) && this.state.cpassword.localeCompare(this.state.password)) {
                console.log("Mismatch");
                alert("Passwords don't match.");
                return;
            }
        } else if (this.state.employee) {
            if (this.state.password.localeCompare(this.state.employee.password) && this.state.cpassword.localeCompare(this.state.password)) {
                console.log("Mismatch");
                alert("Passwords don't match.");
                return;
            }
        }

        let user = {
            password: this.state.password,
        }
        console.log('DATA TO SEND', user);
        axios.patch(`http://localhost:8100/auth/${this.state.currentUser.id}`, user)

        if (this.state.role === "customer") {
            let customer = {
                fullname: this.state.name,
                address: this.state.address,
                nicNo: this.state.nicNo,
                mobileNumber: this.state.mobileNumber,
                email: this.state.email,
                password: this.state.password
            }
            console.log('DATA TO SEND1', customer);
            axios.patch(`http://localhost:8100/customer/${this.state.id}`, customer)
                .then(response => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Customer details have been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location = '/profile'

                })
                .catch(error => {
                    console.log("xxx", error.message);
                    //alert(error.message)
                })
        } else {
            let employee = {
                name: this.state.name,
                mobileNumber: this.state.mobileNumber,
                email: this.state.email,
                password: this.state.password
            }
            console.log('DATA TO SEND2', employee);
            axios.patch(`http://localhost:8100/employee/update-profile/${this.state.id}`, employee)
                .then(response => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Employee details have been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    window.location = '/profile'

                })
                .catch(error => {
                    console.log("xxx", error.message);
                    //alert(error.message)
                })
        }



    }

    back(e) {
        window.location = '/profile'
    }

    navigateUpdateImage(e) {
        window.location = `/update-image/${this.state.currentUser.id}`
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container-form">
                {currentUser ? (
                    <div>
                        <h2>Update my Profile</h2>
                        <div className="container">
                            <div className="row">
                                <div className="col-3" id="profile-box">
                                    <img src={this.state.image} className="card-img" alt="profile" /><br />
                                    <div className="text-center">
                                        <button type="button" id="button" className="btn btn-warning" onClick={e => this.navigateUpdateImage(e)}>Update Image</button>
                                    </div>
                                </div>
                                <div className="col-8" id="profile-box">
                                    <form onSubmit={this.UpdateProfile}>
                                        <div className="mb-3">
                                            <label className="form-label">Full Name</label>
                                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control" name="username" value={this.state.userName} disabled />
                                        </div>
                                        {this.state.customer ? (
                                            <div className="mb-3">
                                                <label className="form-label">NIC Number</label>
                                                <input type="text" className="form-control" name="nicNo" value={this.state.nicNo} onChange={this.onChange} />
                                            </div>
                                        ) : (
                                            <div className="mb-3">
                                                <label className="form-label">NIC Number</label>
                                                <input type="text" className="form-control" name="nicNo" value={this.state.nicNo} disabled />
                                            </div>
                                        )}



                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Mobile number</label>
                                                    <input type="text" className="form-control" name="mobileNumber" value={this.state.mobileNumber} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Email address</label>
                                                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label className="form-label">Confirm Password</label>
                                                    <input type="password" className="form-control" name="cpassword" value={this.state.cpassword} onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.customer && (
                                            <div className="mb-3">
                                                <label className="form-label">Address</label>
                                                <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.onChange} />
                                            </div>
                                        )}
                                        {this.state.employee && (
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label">Position</label>
                                                        <input type="text" className="form-control" name="position" value={this.state.position} disabled />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label">Salary</label>
                                                        <input type="text" className="form-control" name="salary" value={this.state.salary} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="d-grid gap-4 d-md-block">
                                            <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}>Back</button>

                                            <button type="submit" id="button" className="btn btn-warning">Update</button>

                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>

                    </div >
                ) : (
                    <div className="container">
                        <header className="jumbotron">
                            <h3>Please Login to continue! </h3>
                        </header>
                    </div>
                )
                }
            </div>
        );
    }
}