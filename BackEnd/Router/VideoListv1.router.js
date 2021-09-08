const express = require('express');
const router = express.Router();
const { VideoData } = require('../Data/data.js');
const { Video } = require('../Models/Video.model.js');

router.route('/')
.get(async(req,res) =>{
  try{
    const videos = VideoData;
    res.status(200).json({success:true, videos});
  }
  catch{
    res.status(500).json({success: false, message: "No videos available..!"});
  }
})
.post(async(req, res) => {
  try{
    const videoItem = req.body;
    const NewVideo = new Video(videoItem);
    const savedVideo = await NewVideo.save();
    res.json({success: true, video: savedVideo})
  }
  catch(err){
    res.status(500).json({success:false, errorMessage: err.message});
  }
})

router.route('/:id')
.get(async(req,res) => {
  try{
    const {id} = req.params;
    const foundVideos = await Video.find({});
    const filteredVideo = foundVideos.filter((vide) => vide.id === id);
    res.json({ success: true, filteredVideo });
  }
  catch(err){
    res.status(500).json({success:false, message:"unable to fetch video"});
  }
})

module.exports = router;