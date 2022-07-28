const { response } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req, res=response) =>{
  try{

    const doctors = await Doctor.find()
    .populate('user','name')
    .populate('hospital', 'name')

    if(!doctors){
      return res.status(404).send('Doctors not founds')
    }

    return res.status(200).send(doctors);

  }catch(error){
    return res.send(error);
  }
};

const postDoctors = async (req, res=response) =>{
  try{

    const uid = req.uid;

    const doctor = new Doctor({
      user: uid,
      ...req.body
    })

    const dbDoctor = await doctor.save();

    return res.status(200).send(dbDoctor);

  }catch(error){
    return res.status(400).send(error);
  }
};

const putDoctors = async (req, res=response) =>{
  try{
    return res.status(200).send('put Doctors Work!');
  }catch(error){
    return res.status(400).send(error);
  }
};

const deleteDoctors = async (req, res=response) =>{
  try{
    return res.status(200).send('delete Doctors Work!');
  }catch(error){
    return res.status(400).send(error);
  }
};


module.exports = {
  getDoctors,
  postDoctors,
  putDoctors,
  deleteDoctors
};