import React, { Component } from 'react';       //import react and react components
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

import logo from '../../images/logo.jpg';
//import { connect } from 'react-redux';
import store from '../../store';

// const cart = useSelector((state) => state.cart);
// const { cartItems } = cart;


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
        this.getCurrentStateFromStore = this.getCurrentStateFromStore.bind(this);

        this.state = {
            currentUser: undefined,
            isManager: false,
            isReceptionist: false,
            isKitchenHead: false,
            isCustomer: false
        };
        this.state = this.getCurrentStateFromStore();
        console.log("cart", this.state.cart);
    }

    getCurrentStateFromStore() {
        return {
            cart: store.getState().cart,
        }
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
                    if (!response.data.role.name.localeCompare("Manager")) {
                        this.setState({
                            isManager: true,
                        });
                        console.log("mmmm", this.state.isManager);

                    } else if (!response.data.role.name.localeCompare("Receptionist")) {
                        this.setState({
                            isReceptionist: true,
                        });
                    } else if (!response.data.role.name.localeCompare("Kitchen Head")) {
                        this.setState({
                            isKitchenHead: true,
                        });
                    } else if (!response.data.role.name.localeCompare("customer")) {
                        this.setState({
                            isCustomer: true,
                        });
                    }

                }
            );
    }

    logOut() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;
        const { isManager } = this.state;
        const { isReceptionist } = this.state;
        const { isKitchenHead } = this.state;
        const { isCustomer } = this.state;
        const cart = this.state.cart;
        const { cartItems } = cart;
        console.log("123", cartItems);
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

                                {isManager && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/workingEmployee">User</a>
                                    </li>
                                )}
                                {isReceptionist && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/checkAvailableRooms">User</a>
                                    </li>
                                )}
                                {isKitchenHead && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/kitchenHeadDashboard">User</a>
                                    </li>
                                )}
                                {isCustomer && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/customerhome">User</a>
                                    </li>
                                )}

                                {isCustomer && (
                                    <li className="nav-item" >
                                        <a className="nav-link" href="/cart">Cart
                                            {cartItems.length > 0 && (
                                                <span className="badge-cart">{cartItems.length}</span>
                                            )}
                                        </a>
                                    </li>
                                )}
                            </div>

                            {currentUser ? (
                                <div className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">{currentUser.userName}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            LogOut&ensp;&ensp;
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

// const mapStateToProps = function (state) {
//     // const cart = useSelector((state) => state.cart);
//     // const { cartItems } = cart;
//     return {
//         cart: state.cart,

//     }
// }

export default Navbar;