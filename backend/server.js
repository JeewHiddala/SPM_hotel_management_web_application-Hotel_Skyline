const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');   

const Role = require("./src/models/role.model");

//import APIs
const employeeAPI = require('./src/apis/employee.api');   //IT19007502 - Hiddalarachchi J.
const roomAPI = require('./src/apis/room.api');   //IT19007502 - Hiddalarachchi J.
const serviceAPI = require('./src/apis/service.api');   //IT19007502 - Hiddalarachchi J.
const authAPI = require('./src/apis/auth.api');   //IT19059150 - Ranaweera I.G.S.V.
const userAPI = require('./src/apis/user.api');   //IT19059150 - Ranaweera I.G.S.V.
const customerAPI = require('./src/apis/customer.api');   //IT19059150 - Ranaweera I.G.S.V.

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
  initial();
});

//root route
app.route('/').get((req, res) => {
  res.send('SLIIT SPM FINAL API BY SE2021 BATCH');
});

//register router - CHANGEABLE
app.use('/employee', employeeAPI());    //IT19007502 - Hiddalarachchi J.
app.use('/room', roomAPI());    //IT19007502 - Hiddalarachchi J.
app.use('/service', serviceAPI());    //IT19007502 - Hiddalarachchi J.
app.use('/auth', authAPI());    //IT19059150 - Ranaweera I.G.S.V.
app.use('/user', userAPI());    //IT19059150 - Ranaweera I.G.S.V.
app.use('/customer', customerAPI());    //IT19059150 - Ranaweera I.G.S.V.

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "customer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'customer' to roles collection");
      });

      new Role({
        name: "manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'manager' to roles collection");
      });

      new Role({
        name: "reception"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'reception' to roles collection");
      });

      new Role({
        name: "kitchen"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'kitchen' to roles collection");
      });
    }
  });
}