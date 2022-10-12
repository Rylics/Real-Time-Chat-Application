const mongoose = require("mongoose");

const messageShema = new mongoose.Schema({
  socket_id: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  about: {
    type: String,
  },

  password: {
    type: String,
  },
  contact: [
    {
      type: String,
    },
  ],
  // {
  //   name: {
  //     type: String,
  //   },
  //   image: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  // },
  message: [
    {
      sender: {
        type: String,
      },
      receiver: {
        type: String,
      },
      message: {
        type: String,
      },
      image: {
        type: String,
      },
      time: {
        type: String,
      },
      numberTime: {
        type: Number,
      },
    },
  ],
});

const messageModle = mongoose.model("Messages", messageShema);

module.exports = messageModle;
