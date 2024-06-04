const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'Hongolulu$456';


// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',
[body('name', 'Name must be minimum 3 characters long').isLength({min: 3}),
body('email', 'Enter a valid Email').isEmail(),
body('username', 'username must be minimum 5 characters long').isLength({min: 5}),
body('password', 'password must be minimum 8 characters long').isLength({min: 8}),
], async (req, res)=>{
  //If there are errors return bad request
    const errors = validationResult(req);
    const errarray = errors.array()
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errarray})
    }

    //Check whether the email is registered
    try{
      let user = await User.findOne({username: req.body.username})
      if(user){
        return res.status(400).json({success: false, error: "Oops!! Hit an error looks like user already exists"})
      }

      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: secPass,
          DOB: req.body.DOB,
        });

        const data = {
          user:{
            id: user.id
          }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({success: true, authtoken})
    }
    
    catch(error){
      console.error(error.message)
      res.status(500).send("Error Occurred")
    }

})


//Route 2: Authenticate a user using: POST "/api/auth/login".

router.post('/login',
[
body('username', 'Enter a valid username').exists(),
body('password', 'Password field cannot be empty').exists()
],async(req, res) => {

  const errors = validationResult(req);
  const errarray = errors.array()
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errarray})
  }
  const{username, password} = req.body
  try{
    let user = await User.findOne({username});
    if(!user){
      return res.status(400).json({success: false, error: "Please try again with correct credentials"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success: false, error: "Please try again with correct credentials"})
    }

    const data = {
      user:{
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET)
    res.json({success: true, authtoken})

  }
  catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }

})


// Route 3: Get User details using: Post "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async(req, res) => {
try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch(error){
  console.error(error.message)
  res.status(500).send("Internal Server Error")
}
})

module.exports = router