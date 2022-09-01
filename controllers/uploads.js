const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updatePhoto } = require("../helpers/update-photo");

const fileUpload = (req,res = response) =>{
  try{

    const {type, id} = req.params;

    const validTypes = ['hospitals', 'users', 'doctors'];

    // validate type
    if(!validTypes.includes(type)){
      return res.status(400).send('invalid type (hospitals, users or doctors)')
    }
    // validate file
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // process image
    const file = req.files.image;
    const curName = file.name.split('.');
    const extension = curName[curName.length-1]
    
    // validate extension
    const validExtension = ['png', 'jpg', 'jpeg', 'gif']
    if(!validExtension.includes(extension)){
      return res.status(400).send('extension invalid, please upload file png, jpg, jpeg or gif')
    }

    // generate name
    const nameFile = `${uuidv4()}.${extension}`;

    // path save image
    const path = `./uploads/${type}/${nameFile}`;

    //move image
    file.mv(path, (err) => {
      if (err){
        return res.status(500).send(err);
      }

      // refresh db
      updatePhoto(type, id, nameFile);

      res.status(200).send({msg:'Upload FIle',nameFile})
    });

  }catch(e){
    return res.status(500).send(e)
  }
}

const getImage = (req, res)=>{
  const {type, image }= req.params;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  // image default
  if(fs.existsSync(pathImg)){
    res.sendFile(pathImg)
  }else{
    const pathImg = path.join(__dirname, `../uploads/not-avalible.jpg`);
    res.sendFile(pathImg)
  }

}

module.exports = {fileUpload, getImage}
