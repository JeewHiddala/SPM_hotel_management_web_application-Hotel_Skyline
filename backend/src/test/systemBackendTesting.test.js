const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

//import APIs
const bookingAPI = require('../apis/booking.api'); //IT19051826

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

//register router - CHANGEABLE
app.use('/booking', bookingAPI()); //IT19051826

//IT19051826 Test Case 14
//test case 14 - get all booking details


test('Backend Test Case 14 - Should get all booking details - IT19051826  - Herath D.D.M.', async () => {
    await request(app).get('/booking/').send({  
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//IT19051826 Test Case 15
//test case 15 - create booking 

test('Backend Test Case 15 - Should create booking - IT19051826  - Herath D.D.M.', async () => {
    await request(app).post('/booking/create').send({  
        bookingNo:"B009",
        customerId:"222244V",
        roomNo:"D001",
        boardingType:"fullboard",
        bookingDate:"2021-08-24T18:30:00.000+00:00",
        noOfGuests:4,
        days:2,
        arrivalDate:"2021-08-26T18:30:00.000+00:00",
        remarks:"Play area",
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})


//IT19051826 Test Case 16
//test case 16 - delete selected booking details 

app.use('/booking', bookingAPI());

test('Backend Test Case 16 - delete booking details - IT19051826  - Herath D.D.M.', async () => {
    await request(app).delete('/booking/61471b41e8f6c32080be4e78').send({  
   
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})
