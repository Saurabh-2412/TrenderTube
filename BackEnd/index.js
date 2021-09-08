const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var jwt = require('jsonwebtoken');
const mySecret = process.env['Secret']

const AuthValidator = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, mySecret);
    return next();
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

const { dbInitilizer } = require('./DBConnector/DBInitilizer.js');
dbInitilizer();

app.use(cors());
app.use(bodyParser.json());

const v1VideoRouter = require('./Router/VideoList.v1.router');
app.use("/v1/videoData" ,cors(), v1VideoRouter);

const v1WatchLaterRouter = require('./Router/WatchLater.v1.router');
app.use("/v1/watchLater", cors(), AuthValidator, v1WatchLaterRouter);

const v1LikedVideoRouter = require('./Router/LikedVideos.v1.router.js');
app.use("/v1/likedVideos", cors(), AuthValidator, v1LikedVideoRouter);

const v1RecentlyPlayedVideoRouter = require('./Router/RecentlyPlayedVideo.v1.router.js');
app.use("/v1/recentlyPlayedVideos", cors(), AuthValidator, v1RecentlyPlayedVideoRouter);

const v1PlaylistVideoRouter = require('./Router/playlistVideo.v1.router.js');
app.use("/v1/playlistVideos", cors(), v1PlaylistVideoRouter);

const v1UserRouter = require('./Router/User.v1.router.js');
app.use("/v1/userData" ,cors(), v1UserRouter);

app.get('',(req,res) => {
  res.send("Hello! Welcoming you to EXPRESS your world");
})

app.listen(3000, () => {
  console.log('server started');
});