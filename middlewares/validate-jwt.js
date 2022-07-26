const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {

  // get token
  const token = req.header('x-token');

  if(!token){
    return res.status(401).send('Token not found')
  }
  try{

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    console.log(uid)
    req.uid = uid;

    next();
  }catch(e){
    return res.status(401).send('Invalid token')
  }

}

module.exports={validateJwt}