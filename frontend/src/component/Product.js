import React from 'react';
import { Link } from 'react-router-dom';
import '../screens/StyleScreen.css';

export default function Product(props) {
    const { product } = props;
    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img
                    className="medium"
                    src={product.image}
                    alt={product.name}
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h4>{product.name}</h4>
                </Link>

                <div className="price">Rs.{product.price}</div>
            </div>
        </div>
    )
}
