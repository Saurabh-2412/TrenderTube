const express = require('express');
const router = express.Router();
const { WatchLaterVideo } = require('../Models/WatchLater.model.js');
const jwt = require('jsonwebtoken');
const mySecret = process.env['Secret']

router.route('/')
.get(async(req,res) =>{
  try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const foundAllWatchLater = await WatchLaterVideo.find({});
    const foundWatchLater = foundAllWatchLater.filter((watchLater) => watchLater.userId === decoded.id)
    res.status(200).json({success:true, foundWatchLater});
  }
  catch{
    res.status(500).json({success: false, message: "No videos available..!"});
  }
})
.post(async(req, res) => {
  try{
    const videoItem = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const NewVideo = new WatchLaterVideo({ ...videoItem.item, userId:decoded.id });
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
    const foundVideo = await WatchLaterVideo.findOneAndDelete(id)
    const video = await WatchLaterVideo.find({});
    res.status(200).json({ success: true, message: "Deleted successfully", video});
  }
  catch(err){
    res.status(500).json({success:false, message:"unable to delete video",errorMessage:err.message});
  }
})
module.exports = router;