const mongoose = require('mongoose');

function dbInitilizer() {
  // Connecting to DB

  mongoose.connect("mongodb+srv://admin:<password>@videostube.ivjol.mongodb.net/VideoTube?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("successfully connected"))
    .catch(error => console.error("mongoose connection failed...", error))
}

module.exports = { dbInitilizer }