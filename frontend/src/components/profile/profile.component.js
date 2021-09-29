import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import axios from 'axios';
import Swal from "sweetalert2";
import profile from '../../images/profile-avatar.png';

import './profile-styles.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: null,
      employee: null,
      id: '',
      name: '',
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
    this.deleteAccount = this.deleteAccount.bind(this);
    this.back = this.back.bind(this);
    this.navigateUpdateProfile = this.navigateUpdateProfile.bind(this);
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
              });
          } else {
            axios.get(`http://localhost:8100/employee/get-employee/${this.state.currentUser.id}`)
              .then(response => {
                this.setState({ employee: response.data.data })
              })
              .then(() => {
                console.log("aa", this.state.employee)
                this.setState({ name: this.state.employee.name });
                this.setState({ email: this.state.employee.email });
                this.setState({ mobileNumber: this.state.employee.mobileNumber });
                this.setState({ userName: this.state.employee.userName });
                this.setState({ position: this.state.employee.position });
                this.setState({ salary: this.state.employee.salary });
                this.setState({ nicNo: this.state.employee.nicNo });
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

  deleteAccount(e) {
    console.log("I am on Delete", this.state.currentUser.id)
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8100/customer/${this.state.id}`)

        axios.delete(`http://localhost:8100/auth/${this.state.currentUser.id}`)
        Swal.fire(
          'Deleted!',
          'Account has been deleted.',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            AuthService.logout();
            window.location = '/login'
          }
        })
      }
    })
  }

  navigateUpdateProfile(e) {
    window.location = '/update-profile/'
  }

  back(e) {
    window.location = '/home'
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container-form">
        {currentUser ? (
          <div>
            <h2>My Profile</h2><br />
            <div className="container">
              <div className="row">
                <div className="col-3" id="profile-box">
                  <img src={this.state.image} className="card-img" alt="profile" /><br /><br />
                </div>
                <div className="col-8" id="profile-box">
                  <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" name="name" value={this.state.name} disabled />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" name="username" value={this.state.userName} disabled />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">NIC Number</label>
                      <input type="text" className="form-control" name="nicNo" value={this.state.nicNo} disabled />
                    </div>



                    <div className="row mb-3">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Email address</label>
                          <input type="text" className="form-control" name="email" value={this.state.email} disabled />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">Mobile number</label>
                          <input type="text" className="form-control" name="mobileNo" value={this.state.mobileNumber} disabled />
                        </div>
                      </div>
                    </div>
                    {this.state.customer && (
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={this.state.address} disabled />
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
                      {this.state.customer && (
                        <button type="button" id="button" className="btn btn-danger" onClick={e => this.deleteAccount(e)}>Delete</button>
                      )}

                      <button type="button" id="button" className="btn btn-warning" onClick={e => this.navigateUpdateProfile(e)}>Update</button>

                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <header className="jumbotron">
              <h3>Please Login to continue! </h3>
            </header>
          </div>
        )}
      </div>
    );
  }
}