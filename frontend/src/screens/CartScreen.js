import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../component/MessageBox';
import './StyleScreen.css';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/shipping');
    };

    return (
        <div className="row top" id="container-c">
            <div className="col-2">
                <br></br>
                <h4>Food Cart</h4>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/customerhome">Go Shopping</Link>
                    </MessageBox>
                ) : (
                    <ul id="cart-desc">
                        {
                            cartItems.map((item) => (
                                <li key={item.product}>
                                    <div id="cart-card" className="row">
                                        <div id="img-cart">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="medium"
                                            ></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="col">
                                            <br/>
                                            <select
                                                id="select-qty"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col"><br/>Rs.{item.price}</div>
                                        <div><br/><button type="button" className="btn btn-danger" onClick={() => removeFromCartHandler(item.product)}
                                        >Delete</button>
                                        </div>
                                    </div><br/>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
            <div className="col-6">
                <br></br>
                <div className="card1 card-body1" id="cart-proceed">
                    <ul >
                        <li>
                            <h3>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : Rs.
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h3>
                        </li>
                        <br></br>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="btn btn-warning"
                                disabled={cartItems.length === 0}
                            >
                                <h4>Proceed to Checkout</h4>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}
