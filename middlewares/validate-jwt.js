const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = (req, res, next) => {

  // get token
  const token = req.header('x-token');

  if(!token){
    return res.status(401).send('Token not found')
  }
  try{

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  }catch(e){
    return res.status(401).send('Invalid token')
  }

}

const validateADMIN_ROLE = async (req, res, next) => {
  try{
    const uid = req.uid

    const userDb = await User.findById(uid);

    if(!userDb){
      return res.status(404).json({
        ok:false,
        msj: 'User not found'
      })
    }

    if(userDb.role !== 'ADMIN_ROLE'){
      return res.status(403).json({
        ok:false,
        msj: 'no privileges'
      })
    }

    next();

  }catch(err){
    res.status(500).json({
      ok:false,
      msj: 'contact to administrator'
    })
  }
}

const validateADMIN_ROLE_or_sameUser = async (req, res, next) => {
  try{
    const uid = req.uid

    const id = req.params.id
    console.log('uid:', uid, 'id:', id)
    const userDb = await User.findById(uid);

    if(!userDb){
      return res.status(404).json({
        ok:false,
        msj: 'User not found'
      })
    }

    if(userDb.role === 'ADMIN_ROLE' || uid === id){
      
      next();

    }else{
      return res.status(403).json({
        ok:false,
        msj: 'no privileges'
      })
    }

  }catch(err){
    res.status(500).json({
      ok:false,
      msj: 'contact to administrator'
    })
  }
}

module.exports={validateJwt, validateADMIN_ROLE, validateADMIN_ROLE_or_sameUser}
