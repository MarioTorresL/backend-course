const mongoose = require('mongoose');

const dbConnect = async ()=>{
  try{
    await mongoose.connect(process.env.DB_CNN);
    console.log('DataBase Online')
  }catch(e){
    console.log(e);
    throw new Error('Conection Error')
  }
}

module.exports = {dbConnect}