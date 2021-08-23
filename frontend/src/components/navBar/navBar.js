import React, { Component } from 'react';       //import react and react components
import { Link, BrowserRouter as Router } from "react-router-dom";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

import logo from '../../images/logo.jpg';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }

        UserService.getUserBoard()
            .then(
                response => {
                    console.log("fffffff", response.data.role.name);


                }
            );
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <Router>
                    <div className="navBar">
                        <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
                            &ensp;<img src={logo} width="50px" height="50px" alt="Hotel Skylight" />
                            <Link to={"/"} className="navbar-brand">
                                &ensp;Hotel Skylight
                            </Link>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#rooms">Rooms</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#gallery">Dining</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#contact">About</a>
                                </li>

                                {currentUser && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/user">User</a>
                                    </li>
                                )}
                            </div>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">{currentUser.userName}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            LogOut
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="/register-customer">Sign Up</a>
                                    </li>
                                </div>
                            )}
                        </nav>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Navbar;