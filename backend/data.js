// const bcrypt =require('bcryptjs');

const data = {

    products: [
        {

            name: 'Vegetable Salad',
            category: 'Breakfast',
            image: '/images/p1.jpg',
            price: 200,
            countInStock: 10,
            description: 'vegetable salad',
        },
        {

            name: 'Cheese Bread',
            category: 'Breakfast',
            image: '/images/p2.jpg',
            price: 250,
            countInStock: 20,
            description: 'loaded with mozeralla cheese',
        },
        {

            name: 'Cheese Cake',
            category: 'Desserts',
            image: '/images/p3.png',
            price: 350,
            countInStock: 15,
            description: 'delicious cheese cake with blue berry',
        },

    ],
};

module.exports = { data };