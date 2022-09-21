const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const {getMenuDashboard} = require('../helpers/menu-dashboard');

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

    res.json({
      ok:true,
      token:token,
      menu:getMenuDashboard(user.role)
    })

  }catch(e){
    return res.status(500).send(e)
  }
}

const googleSignIn = async (req, res=response) =>{
  try{

    const {email, name, picture} = await googleVerify(req.body.token);

    const dbUser = await User.findOne({email});
    let user;

    // verify if google or db user and create db google true
    if(!dbUser){
      user = new User({
        name,
        email,
        img: picture,
        password: '@@@',
        google:true
      })
    }else{
      user = dbUser;
      user.google = true
      // user.password = '@@'
    }
    // save user
    await user.save();

    // generate jwt
    const token = await generateJWT(user.id);


    return res.json({
      ok:true,
      token,
      menu: getMenuDashboard(user.role)
    })
  }catch(e){
    return res.status(400).send(e)
  }
}

const renewToken = async(req, res=response)=>{
  try{
    const uid = req.uid
    // generate token
    const user = await User.findById(uid)

    const token = await generateJWT(uid)

    return res.json({
      token, 
      user,
      menu:getMenuDashboard(user.role)
    })
  }catch(e){
    return res.status(500).send(e)
  }
}

module.exports = {login, googleSignIn, renewToken}
