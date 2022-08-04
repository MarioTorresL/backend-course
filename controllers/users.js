const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res) =>{
  try{
    const desde = Number(req.query.desde) || 0; //query params

    const users = await User.find({}, 'name email img role, google ').skip(desde).limit(5);

    const total = await User.count();

    res.status(200).json({users, total})

  }catch(e){

    res.send(e)

  }
};

const postUsers = async (req, res = response) =>{

  const { email, password, name} = req.body;

  try{

    const verifyEmail = await User.findOne({email});

    if(verifyEmail){
      return res.status(400).send('El correo ya esta en uso')
    }else{

      const user = new User(req.body);

      //encripted password
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt)
      
      await user.save();
      // generate token

      const token = await generateJWT(user.id)

      return res.json({user, token:token})
    }

  }catch(e){
    res.status(500).send(e)
  }
};

const putUsers = async (req, res= response) =>{
  const uid = req.params.id;
  const {name, email, role,} = req.body;
  try{

    const user = await User.findById(uid);

    if(!user){
      return res.status(404).send('Not found')
    }

    const userUpdate = await User.findByIdAndUpdate(uid, {name, email, role}, {new:true});

    // TODO: validate token and validate user login

    return res.json(userUpdate)

  }catch(e){
    res.status(500).send(e)
  }
};

const deleteUser = async(req, res=response)=>{
  const uid = req.params.id;
  try{

    const user = await User.findById(uid)

    if(!user){
      return res.status(404).send('Not Found')
    }

    await User.findByIdAndDelete(uid);

    return res.send('User Delete')
  }catch(e){
    res.status(500).send(e);
  }
}

module.exports = {getUsers, postUsers, putUsers, deleteUser}