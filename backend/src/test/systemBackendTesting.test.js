const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

//import APIs
//IT19007502 - Hiddalarachchi J.
const roomAPI = require('../apis/room.api');
const serviceAPI = require('../apis/service.api');
const employeeAPI = require('../apis/employee.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
jest.setTimeout(18000);

//port no for run backend server
const PORT = process.env.TESTPORT || 8067;
const MONGODB_URI = process.env.TESTMONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI || '&w=majority',{
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

//register router - CHANGEABLE.
//IT19007502 - Hiddalarachchi J.
app.use('/room', roomAPI());
app.use('/employee', employeeAPI());
app.use('/service', serviceAPI());

//TestCases
//test case 01 - add new room
test('Backend Test Case 01 - Should insert a new room - IT19007502 - Hiddalarachchi J.', async () => {
    await request(app).post('/room/create').send({
        roomNo:"Z002",
        category:"Single Room",
        airConditioningCategory:"A/C",
        description: "High Budget Room",
        price:18000,
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - Update room details
test('Backend Test Case 02 - Should update existing room details - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).patch('/room/update/61542fffd452935a383b6918').send({
        roomNo:"Z055",
        category:"Double Room",
        airConditioningCategory:"Non A/C",
        description: "Budget Room",
        price:18070,
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 03 - delete room details
test('Backend Test Case 03 - Should delete existing room details - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).delete('/room/6154a770877e0b25dcbe7983').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 04 - get specific room details
test('Backend Test Case 04 - Should get specific room details - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).get('/room/6154d07f651ba2408436d4c4').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 05 - add new working employee
test('Backend Test Case 05 - Should insert a new working employee - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).post('/employee/create').send({
        name:"Saman Hettiwaththa",
        position:"Chef",
        email:"saman@skylight.com",
        mobileNumber: "0787555555",
        nicNo:"544481111V",
        salary:75000,
        isWorking: true,
        userName:"samanH",
        password:"saman123"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 06 - add retired working employee
test('Backend Test Case 06 - Should insert retired employee - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).post('/employee/create').send({
        name:"Saman Hettiwaththa",
        position:"Chef",
        email:"saman@skylight.com",
        mobileNumber: "0787555555",
        nicNo:"544481111V",
        salary:75000,
        isWorking: false,
        userName:"samanH",
        password:"saman123"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 07 - Update working employee details
test('Backend Test Case 07 - Should update existing working employee details - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).patch('/employee/update/615434cf0214155e44096f9b').send({
        name:"Saman1 Hettiwaththa",
        position:"Manager",
        email:"saman1@skylight.com",
        mobileNumber: "0787555511",
        nicNo:"544481177V",
        salary:75007,
        isWorking: true,
        userName:"samanH1",
        password:"saman123777",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 08 - delete retired employee details
test('Backend Test Case 08 - Should delete retired employee details - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).delete('/employee/6154d080651ba2408436d4cb').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 09 - get specific employee details
test('Backend Test Case 09 - Should get specific employee details - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).get('/employee/6154a886f7a94763d446f408').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 10 - add new service
test('Backend Test Case 10 - Should insert a new service - IT19007502  - Hiddalarachchi J.', async () => {
    await request(app).post('/service/create').send({
        serviceNo:"SN085",
        name:"Surfing",
        addedDate:"2011-11-11",
        pricePerHour: "5500",
        description: "We pay attention for build your joy with nature",
        employeeCount:15,
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

// //test case 11 - Update service details
// test('Backend Test Case 11 - Should update existing service details - IT19007502  - Hiddalarachchi J.', async () => {
//     await request(app).patch('/service/update/61543506c6bf3a0a948f2dc4').send({
//         serviceNo:"SN885",
//         name:"Sea Surfing",
//         addedDate:"2022-12-10",
//         pricePerHour: "5500",
//         description: "We pay attention for build your joy with sea creations",
//         employeeCount:25,
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

// //test case 12 - delete service details
// test('Backend Test Case 12 - Should delete existing service details - IT19007502  - Hiddalarachchi J.', async () => {
//     await request(app).delete('/service/6154d080651ba2408436d4c7').send({
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

// //test case 13 - get specific service details
// test('Backend Test Case 13 - Should get specific service details - IT19007502  - Hiddalarachchi J.', async () => {
//     await request(app).get('/service/6154a7b00afbc94b78ac4e14').send({
//     }).expect(200).then((res) => {
//         id = res.body._id;
//     });
// })

