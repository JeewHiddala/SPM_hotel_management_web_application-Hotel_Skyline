const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

//import APIs

//const foodApi = require('../apis/food.api');// IT19021058 -De Seram E.M.A.P.
 const ingredientApi = require('../apis/ingredient.api'); // IT19021058 -De Seram E.M.A.P.
// const serviceListApi = require('../apis/serviceList.api'); // IT19021058 -De Seram E.M.A.P.
// const customerServiceApi = require('../apis/customerService.api'); // IT19021058 -De Seram E.M.A.P.



dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
jest.setTimeout(18000);

//port no for run backend server
const PORT = process.env.TESTPORT || 8067;
const MONGODB_URI = process.env.TESTMONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI || '&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

//open connection
mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

//root route
app.route('/').get((req, res) => {
    res.send('SLIIT SPM Project Test');
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});

//register router - CHANGEABLE


//app.use('/food', foodApi());// IT19021058 -De Seram E.M.A.P.
 app.use('/serviceList', serviceListApi());  // IT19021058 -De Seram E.M.A.P.
// app.use('/ingredient', ingredientApi()); // IT19021058 -De Seram E.M.A.P.
// app.use('/customerService', customerServiceApi());  // IT19021058 -De Seram E.M.A.P.


//test case 18 - add new food
// test('should insert a new Food', async () => {
//     await request(app).post('/food/create').send({
//         foodNumber: "N00648",
//         foodName: "Rice",
//         category: "Dinner",
//         price: 500,
//         description: "Fried Rice",
//         createDate: "2021-08-10",
//         status: "True",
//         chefName: "416d616c6920706572657261",
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

//test case 19 - update food details
// test('should update Food', async () => {
//     await request(app).patch('/food/update/6154b935a96a0b141c85bf68').send({
//         foodNumber: "N00648",
//         foodName: "Rice",
//         category: "Dinner",
//         price: 800,
//         description: "Fried Rice",
//         createDate: "2021-08-10",
//         status: "True",
//         chefName: "416d616c6920706572657261",
//     }).expect(200).then((res) => {

//     });
// })

//test case 20 - delete selected ingredient
// test('should delete ingredient', async () => {
//     await request(app).delete('/ingredient/61249bda7512594d4c3c5c4a').send({

//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

//test case 21 - create new ingredient
test('should insert a new Ingredient', async () => {
    await request(app).post('/ingredient/create').send({
        orderNumber: "IO00082",
        ingredientName: "Carrot",
        quantity: "15kg",
        chefName: "611a0f6ca28bea02808efe8a",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 22 - get all service list details
// test('should get service list details', async () => {
//     await request(app).get('/serviceList').send({

//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

//test case 23 - add new customer service
// test('should insert a new Customer service', async () => {
//     await request(app).post('/customerService/create').send({
//         bookingID: "61267e14d326d6217cc60b11",
//         serviceName: "6124244653d5e665c865323e",
//         date: "2021-09-28",
//         noOfHours: 2,
//         price: 750,
//         cost: 1500,
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })
