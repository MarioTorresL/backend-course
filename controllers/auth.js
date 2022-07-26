const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res)=>{
  const {email, password} = req.body;
  try{

    const user = await User.findOne({email})
    // verify user
    if(!user){
      return res.status(404).send('User or pasword invalid')
    }

    const validPass = bcrypt.compareSync(password, user.password);
    // verify pass
    if(!validPass){
      return res.status(400).send('User or password invalid')
    }
    // genrateToken
    const token = await generateJWT(user.id);

    res.json({token:token})

  }catch(e){
    return res.status(500).send(e)
  }
}

module.exports = {login}