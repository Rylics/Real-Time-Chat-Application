const mongoose = require("mongoose");

const groupMessageShema = new mongoose.Schema([
  {
    groupName: {
      type: String,
    },
    groupId: {
      type: String,
    },
    members: [
      {
        type: String,
      },
    ],
    groupMessage: [
      {
        type: String,
      },
    ],
  },
]);

const groupMessage = mongoose.model("groupMessages", groupMessageShema);

module.exports = groupMessage;
