const mongoose = require("mongoose");

const userToken = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  },
});

module.exports = mongoose.model("token", userToken);