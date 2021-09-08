const mongoose = require("mongoose");

const WatchLaterSchema = new mongoose.Schema({
    id:String,
    poetName: String,
    topic: String,
    videoId: String,
    videoImageId: String,
    videoLength: String,
    likes: Number,
    views: Number,
    uploadTime: String,
    userId:String
});

const WatchLaterVideo = mongoose.model("WatchLaterVideo", WatchLaterSchema);

module.exports = { WatchLaterVideo }