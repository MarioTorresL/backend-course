const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req, res=response) =>{
  try{

    const hospitals = await Hospital.find().populate('user', 'name')

    if(!hospitals){
      return res.status(404).send('Hospitals not founds')
    }
    return res.status(200).send(hospitals)
  }catch(error){
    return res.status(500).send(error)
  }
}

const postHospitals = async (req, res=response) =>{
  try{

    const uid = req.uid;

    const hospital = new Hospital({
      user:uid,
      ...req.body
    });

    const dbHospital = await hospital.save();

    return res.status(200).send(dbHospital);

  }catch(error){
    return res.status(500).send(error)
  }
}
const putHospitals = async (req, res=response) =>{
  try{

    const id = req.params.id;
    const hospital = await Hospital.findById(id)

    if(!hospital){
      return res.status(404).send('Hospital not found');
    }

    const updateHospital = {
      ...req.body,
      user:req.uid
    }

    const saveHospital = await Hospital.findByIdAndUpdate(id, updateHospital, {new:true})

    return res.status(200).send(saveHospital)
  }catch(error){
    
  }
}
const deleteHospitals = async (req, res=response) =>{
  try{

    const id = req.params.id;

    const hospital = await Hospital.findById(id);

    if(!hospital){
      return res.send('Hospital not found');
    }

    await Hospital.findByIdAndDelete(id)

    return res.send('Delete Hospital Correctly')
  }catch(error){
    return res.status(500).send(error)
  }
}

module.exports = { 
  getHospitals, 
  postHospitals, 
  putHospitals, 
  deleteHospitals
}