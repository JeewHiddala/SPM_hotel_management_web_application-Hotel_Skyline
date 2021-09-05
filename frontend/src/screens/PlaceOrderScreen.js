import React, { useEffect } from 'react';
import './StyleScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../component/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top" id="container-c">
        <div className="col-2">
          <ul>
            <li>
              <div className="card2 card-body2">
                <h2>Delivery Details</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card2 card-body2">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card2 card-body2">
                <h2>Order Food Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-5">
          <div className="card2 card-body2">
            <ul id="c-desc">
              <li>
                <h4>Order Summary</h4>
              </li>
              <li>
                <div className="row">
                  <div><h4>Food Items</h4></div>
                  <div><h5>Rs.{cart.itemsPrice.toFixed(2)}</h5></div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div><h4>Delivery</h4></div>
                  <div><h5>Rs.{cart.shippingPrice.toFixed(2)}</h5></div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div><h4>Additional charge</h4></div>
                  <div><h5>Rs.{cart.taxPrice.toFixed(2)}</h5></div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> <h4>Order Total</h4></strong>
                  </div>
                  <div>
                    <strong><h5>Rs.{cart.totalPrice.toFixed(2)}</h5></strong>
                  </div>
                </div>
              </li>
              <br></br>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}