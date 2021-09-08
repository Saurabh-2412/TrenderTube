const mongoose = require("mongoose");

const PlayListSchema = new mongoose.Schema({
    userId:String,
    playlistName: String, 
    playlistvideo: Array
});

const PlaylistVideo = mongoose.model("PlaylistVideo", PlayListSchema);

module.exports = { PlaylistVideo }