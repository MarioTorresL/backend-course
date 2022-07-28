
const fs = require('fs');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deletephoto = async(path) =>{
  if(fs.existsSync(path)){
    // delete old image
    fs.unlinkSync(path)
  }
}

const updatePhoto = async (type, id, nameFile)=>{
  let oldPath = '';

  switch (type) {

    case 'doctors':

      const doctor = await Doctor.findById(id);
      console.log(doctor )
      if(!doctor){

        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deletephoto(oldPath);

      // save new image
      doctor.img = nameFile;
      await doctor.save();

    break;

    case 'hospitals':

      const hospital = await Hospital.findById(id);
      if(!hospital){
        return false
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deletephoto(oldPath);

      // save new image
      hospital.img = nameFile;
      await hospital.save();

      return true
    
    break;

    case 'users':

      const user = await User.findById(id);
      if(!user || user == null){
        return false
      }

      oldPath = `./uploads/users/${user.img}`;
      deletephoto(oldPath);

      // save new image
      user.img = nameFile;
      await user.save();

      return true
  
    break;

    default:
      break;
  }

}

module.exports = {updatePhoto};