import React, { Component } from 'react';       //import react and react components
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Navbar(props) {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    return (
        <div>
            <div className="navBar">
                <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Hotel SkyLight</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Rooms</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Dining</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">About</a>
                                </li>
                                <li className="nav-item" >
                                    <a className="nav-link" href="/cart">Cart
                                        {cartItems.length > 0 && (
                                            <span className="badge">{cartItems.length}</span>
                                        )}
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/signout">Sign Out</a>

                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}



