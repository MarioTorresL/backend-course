require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnect } =require('./database/config');


//create express
const app = express();

//cors
app.use(cors());

// public
app.use(express.static('public'));

//parse body
app.use(express.json())

//conection db
dbConnect();

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/search', require('./routes/search'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT , ()=>{
  console.log('Runing server in Port 3000')
});