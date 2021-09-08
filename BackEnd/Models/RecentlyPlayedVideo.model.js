const mongoose = require("mongoose");

const RecentlyPlayedSchema = new mongoose.Schema({
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

const RecentlyPlayedVideos = mongoose.model("RecentlyPlayedVideo", RecentlyPlayedSchema);

module.exports = { RecentlyPlayedVideos }