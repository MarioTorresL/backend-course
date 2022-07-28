const { response } = require('express');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');


const getSearch = async (req, res=response) =>{
  try{

    const search = req.params.search;
    const regx = new RegExp(search, 'i');

    const [users, hospitals, doctors] = await Promise.all([
      User.find({ name:regx }),
      Hospital.find({name:regx}),
      Doctor.find({name:regx})

    ])


    return res.status(200).send({msg:"ok", users, hospitals, doctors})

  }catch(e){
    return res.send(e)
  }
};

const getCollection = async (req, res=response) =>{
  try{

    const table = req.params.table;
    const search = req.params.search;
    const regx = new RegExp(search, 'i');

    let data = [];

    switch(table){
      case 'doctors':
        data = await Doctor.find({name:regx}).populate('user', 'name img').populate('hospital', 'name img')
      break
      
      case 'users':
        data = await User.find({name:regx});
      break

      case 'hospitals':
        data = await Hospital.find({name:regx}).populate('user', 'name img')
      break

      default:
        return res.status(400).send('Invalid table name')

      }
      
    return res.status(200).send({msg:"ok", data})

  }catch(e){
    return res.send(e)
  }
};

module.exports = {getSearch, getCollection};