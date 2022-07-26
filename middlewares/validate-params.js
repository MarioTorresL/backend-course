const { response }  = require('express');
const {validationResult} = require('express-validator');

const validateParams = (req, res, next) =>{

  const errors = validationResult( req ); //check for errors in req

  if( !errors.isEmpty() ){
    return res.status(400).json({errors:errors.mapped()})
  }

  next();

}

module.exports = {validateParams}