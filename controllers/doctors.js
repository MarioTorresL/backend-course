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
      ...req.body,
      user: uid
    })

    const dbDoctor = await doctor.save();

    return res.status(200).send(dbDoctor);

  }catch(error){
    return res.status(400).send(error);
  }
};

const putDoctors = async (req, res=response) =>{
  try{
    const id = req.params.id;
    const uid = req.uid;

    const doctor = await Doctor.findById(id);

    if(!doctor){
      return res.status(404).send('Doctor not found')
    }

    const updateDoctor = {
      ...req.body,
      user:uid
    }

    const saveDoctor = await Doctor.findByIdAndUpdate(id, updateDoctor, {new:true})
    
    return res.status(200).send(saveDoctor);
  
  }catch(error){
    return res.status(400).send(error);
  }
};

const deleteDoctors = async (req, res=response) =>{
  try{
    const id = req.params.id;

    const doctor = await Doctor.findById(id);

    if(!doctor){
      return res.send('Doctor not found')
    }
    await Doctor.findByIdAndDelete(id)

    return res.status(200).json({message:'delete Doctor Correctly'});

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
