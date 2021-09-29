const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

//import APIs
const attendanceAPI = require('../apis/attendance.api');
const employeeLeaveAPI = require('../apis/employeeLeaves.api');
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
app.use('/attendance', attendanceAPI());
app.use('/employeeLeaves', employeeLeaveAPI());

//test case 1 IT19059150
test('Backend Test Case 24 - Should enter a new attendance - IT19059150  - Ranaweera I.G.S.V.', async () => {
    await request(app).post('/attendance/create').send({
        "employee": "61202cba45591f2f9421f5c7",
        "receptionist": "611f2fecea3a3a3cc4f2cab2",
        "status": "Working"
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 2 IT19059150
test('Backend Test Case 25 - Should get all employee Leaves details - IT19059150  - Ranaweera I.G.S.V.', async () => {
    await request(app).get('/employeeLeaves/').send({  

    }).expect(200).then((res) => {
        id = res.body._id;
    });
})