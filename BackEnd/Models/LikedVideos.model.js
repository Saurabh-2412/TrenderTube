const mongoose = require("mongoose");

const LikedSchema = new mongoose.Schema({
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

const LikedVideo = mongoose.model("LikedVideo", LikedSchema);

module.exports = { LikedVideo }