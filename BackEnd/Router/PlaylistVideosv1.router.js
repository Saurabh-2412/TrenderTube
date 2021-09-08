const express = require('express');
const router = express.Router();
const { PlaylistVideo } = require('../Models/PlaylistVideo.model');
const jwt = require('jsonwebtoken');
const mySecret = process.env['Secret'];

router.route('/')
  //getting all playlist
  .get(async (req, res) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, mySecret);
      const Allplaylist = await PlaylistVideo.find();
      const playlist = Allplaylist.filter((playlister) => playlister.userId === decoded.id);
      res.status(200).json({ success: true, playlist })
    }
    catch (err) {
      res.status(500).json({ success: false, message: err.message })
    }
  })
  //creating playlist
  .post(async (req, res) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, mySecret);
      const playlistItem = req.body;
      const NewPlaylistVideo = new PlaylistVideo({ ...playlistItem,userId: decoded.id });
      const savedPlaylist = await NewPlaylistVideo.save();
      res.json({ success: true, savedPlaylist })
    }
    catch{
      res.status(500).json({ success: false, message: "unable to add playlist" })
    }
  })

router.route('/:playlistId')
  //getting single playlist
  .get(async (req, res) => {
    try {
      const { playlistId } = req.params;
      const playlist = await PlaylistVideo.findById(playlistId);
      res.status(200).json({ success: true, playlist })
    }
    catch (err) {
      res.status(500).json({ success: false, message: err.message })
    }
  })
  //updating playlist video array list => Actions { push, pop & clear }
  .post(async (req, res) => {
    try {
      const { playlistId } = req.params;
      const { playlistVideoItem,action } = req.body;
        if(action === "push") {
          await PlaylistVideo.findByIdAndUpdate(playlistId, 
          {$push: {playlistvideo: playlistVideoItem }})
        } else if(action === "pull") {
          await PlaylistVideo.findByIdAndUpdate(playlistId, 
          {$pull: {playlistvideo: playlistVideoItem }})
        } else if(action === "empty") {
          const playlist = await PlaylistVideo.findById(playlistId);
          console.log(playlist.playlistvideo);
          for (let i = 0; i < playlist.playlistvideo.length; i++) {
            await PlaylistVideo.findByIdAndUpdate(playlistId,
            {$pull: {playlistvideo: playlist.playlistvideo[i] }})
          }
      }
      const updatedPlaylist = await PlaylistVideo.findById(playlistId);
      res.json({ success: true, updatedPlaylist });
    }
    catch{
      res.status(500).json({ success: false, message: "unable to add playlist" })
    }
  })
  //deleting playlist 
  .delete(async (req, res) => {
    try {
      const { playlistId } = req.params;
      const playlist = await PlaylistVideo.findByIdAndDelete(playlistId);
      res.status(200).json({ success: true, playlist });
    }
    catch (err) {
      res.status(500).json({ success: false, message: "unable to delete playlist" })
    }
  })

module.exports = router;