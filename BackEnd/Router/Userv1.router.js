const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../Models/User.model.js');
const mySecret = process.env['Secret']

router.route('/')
.get(async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const user = await User.find({});
    const userData = user.filter((currentUser) => currentUser.mail === decoded.id);
    res.status(200).json({ success: true, userData });
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to fetch users list", errorMessage: err.message });
  }
})
.post(async(req, res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const user = req.body;
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    const NewUser = new User({...user, password: encryptedPassword});
    const savedUser = await NewUser.save();
    const UserRecord = await User.find({});
    res.status(200).json({success: true, message: "user added successfully",UserRecord});
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add user", errorMessage: err.message});
  }
})

router.route('/:id')
.post(async(req,res) => {
  try{
    const user = req.body;
    const userData = await User.find();
    const foundUser = userData.filter((currentUser) => currentUser.mail === user.userId);
    const token = jwt.sign({ id: user.userId }, mySecret, {expiresIn:'24hr'});
    const result = bcrypt.compareSync( user.password, foundUser[0].password)
    if(result === true){
      res.status(200).json({ success: true, foundUser, token});
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  }
  catch(err){
    res.status(500).json({success:false, message: err.message})
  }
})

module.exports = router;