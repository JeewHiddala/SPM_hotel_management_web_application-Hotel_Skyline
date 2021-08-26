import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import './StyleScreen.css';

export default function ProductScreen(props) {

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox varient="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Back to result</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h3>{product.name}</h3>
                                </li>
                                <li>

                                </li>
                                <li>
                                    <h3>Price : Rs.{product.price}</h3>
                                </li>
                                <li><h3>Description:
                                    <p>{product.description}</p></h3>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <div className="card1 card-body1">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div><h3>Price</h3></div>
                                            <div className="price">Rs.{product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><h4>Status</h4></div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="error">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div><h4>Qty</h4></div>
                                                        <div>
                                                            <select value={qty} onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="btn btn-warning">Add to Cart</button>
                                                </li>
                                            </>
                                        )}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}
