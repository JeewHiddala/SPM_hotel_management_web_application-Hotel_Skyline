import React, { useEffect } from 'react';
import Product from '../component/Product';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import './StyleScreen.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../footer/footer';
import Navbar from '../screens/NavScreen';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (


        <div id="container-c">
            <br></br>
            <h2>Food Items</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox varient="danger">{error}</MessageBox>
            ) : (
                // <div className="container">
                <div className="row center">

                    {products.map(product => (
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
                // </div>
            )}

        </div>

    );
}
