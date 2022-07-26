require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnect } =require('./database/config');


//create express
const app = express();

//cors
app.use(cors());

//parse body
app.use(express.json())

//conection db
dbConnect();

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'))

app.listen( process.env.PORT , ()=>{
  console.log('Runing server in Port 3000')
});