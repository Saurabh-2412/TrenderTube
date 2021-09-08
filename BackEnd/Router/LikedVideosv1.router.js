const express = require('express');
const router = express.Router();
const { LikedVideo } = require('../Models/LikedVideos.model.js');
const jwt = require('jsonwebtoken');
const mySecret = process.env['Secret'];

router.route('/')
.get(async(req,res) =>{
  try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const foundAllLikedVideo = await LikedVideo.find({});
    const foundLikedVideo = foundAllLikedVideo.filter((likes) => likes.userId === decoded.id)
    res.status(200).json({success:true, foundLikedVideo});
  }
  catch{
    res.status(500).json({success: false, message: "No videos available..!"});
  }
})
.post(async(req, res) => {
  try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const videoItem = req.body;
    const NewVideo = new LikedVideo({...videoItem.item, userId: decoded.id});
    const savedVideo = await NewVideo.save();
    res.json({success: true, savedVideo})
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add video in db", errorMessage: err.message});
  }
})

router.route('/:id')
.delete(async(req, res) => {
  try{
    const { id } = req.params;
    const foundVideo = await LikedVideo.findOneAndDelete(id)
    const video = await LikedVideo.find({});
    res.status(200).json({ success: true, message: "Deleted successfully", video});
  }
  catch(err){
    res.status(500).json({success:false, message:"unable to delete video",errorMessage:err.message});
  }
})
module.exports = router;