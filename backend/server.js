const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');   

//import APIs
const employeeAPI = require('./src/apis/employee.api');   //IT19007502 - Hiddalarachchi J.
const roomAPI = require('./src/apis/room.api');   //IT19007502 - Hiddalarachchi J.
const serviceAPI = require('./src/apis/service.api');   //IT19007502 - Hiddalarachchi J.

const foodApi = require('./src/apis/food.api');// IT19021058 -De Seram E.M.A.P.

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

//port no for run backend server
const PORT = process.env.PORT || 8066;
const MONGODB_URI = process.env.MONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI, {
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
  res.send('SLIIT SPM FINAL API BY SE2021 BATCH');
});

//register router - CHANGEABLE
app.use('/employee', employeeAPI());    //IT19007502 - Hiddalarachchi J.
app.use('/room', roomAPI());    //IT19007502 - Hiddalarachchi J.
app.use('/service', serviceAPI());    //IT19007502 - Hiddalarachchi J.

app.use('/food',foodApi());// IT19021058 -De Seram E.M.A.P.

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});