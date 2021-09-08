const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    id:String,
    poetName: String,
    topic: String,
    videoId: String,
    videoImageId: String,
    videoLength: String,
    likes: Number,
    views: Number,
    uploadTime: String
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video }