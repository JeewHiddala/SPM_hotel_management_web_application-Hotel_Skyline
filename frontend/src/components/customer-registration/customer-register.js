import React, { Component } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import '../login/styles.css';
import '../customer-registration/customer-register.css';

import AuthService from "../../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 15 characters.
            </div>
        );
    }
};

// const vcpassword = value => {
//     if (!value.localeCompare(this.state.password)) {

//         return (
//             <div className="alert alert-danger" role="alert">
//                 The confirm password must match given password.
//             </div>
//         );
//     }
// };

export default class CustomerRegister extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            fullname: "",
            address: "",
            nicNo: "",
            mobileNumber: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            userData: "",
            successful: false,
            message: ""
        };
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();
        if (this.state.confirmPassword.localeCompare(this.state.password)) {
            console.log("Mismatch");
            alert("Passwords don't match.");
        }
        else if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.userName,
                this.state.password,
            ).then(
                response => {
                    this.setState({
                        userData: response.data.data._id,
                    });
                    let customer = {
                        fullname: this.state.fullname,
                        address: this.state.address,
                        nicNo: this.state.nicNo,
                        mobileNumber: this.state.mobileNumber,
                        userName: this.state.userName,
                        email: this.state.email,
                        password: this.state.password,
                        userData: this.state.userData
                    }
                    axios.post('http://localhost:8100/customer/create', customer)
                        .then((response) => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Welcome ' + this.state.fullname + ' !',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              window.location = '/login';
                        })
                        .catch((error) => {
                            alert('Data not successfully inserted')
                        })
                        
                },
                error => {
                    alert('Signup failed. Username already exists');
                }
            );

        }
    }

    render() {
        return (
            <div className="container-log">
                <div className="container">
                    <h2>Customer Registration</h2><br />
                    <p className="required">* Note that all the fields are required.</p>
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="fullname">Full name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        value={this.state.fullname}
                                        onChange={this.onChange}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.onChange}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="nicNo">NIC Number</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="nicNo"
                                                value={this.state.nicNo}
                                                onChange={this.onChange}
                                                validations={[required]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="mobileNumber">Mobile Number</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="mobileNumber"
                                                value={this.state.mobileNumber}
                                                onChange={this.onChange}
                                                validations={[required]}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="userName">Username</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="userName"
                                                value={this.state.userName}
                                                onChange={this.onChange}
                                                validations={[required, vusername]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                                validations={[required, email]}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                                validations={[required, vpassword]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="confirmPassword"
                                                value={this.state.confirmPassword}
                                                onChange={this.onChange}
                                                validations={[required]}
                                            />
                                        </div>
                                    </div>
                                </div>



                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Register as Customer</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}