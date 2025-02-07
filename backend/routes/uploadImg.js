const express = require('express')
const multer = require('multer')
const path = require('path')
const fetchUser = require('./middleware/fetchUser')
const User = require('../models/User')
const  router = express.Router()

// Require controller modules.
const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename:(req, file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

router.post("/uploadImg",[fetchUser,upload.single('profilePic')] ,async(req, res)=>{
  try {
    const id = req.user.id;
    let u = await User.findById(id)
    if(!u){
      res.status(400).send({error:"invalid credentials!"})
      return;
    }
    u.set({
        profile_image: `http://127.0.0.1:3001/image/${req.file.filename}`
      })
      await u.save();
    res.json({
      success:1,
      profile_image: `http://127.0.0.1:3001/image/${req.file.filename}`
    })
  } catch (error) {
    
  }
    
})



module.exports = router