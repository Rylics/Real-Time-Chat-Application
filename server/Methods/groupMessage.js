const UserAccount = require("../controller/SignUp");
const groupMessage = require("../models/groupMessage");
const Messages = require("../models/groupMessage");

const createGroup = (req, res) => {
  const { userName, groupname, groupId, message } = req.body;
  try {
    if (!groupname || !groupId) {
      return res.sendStatus(400);
    }
    groupMessage.insertMany({
      groupId: groupId,
      members: [userName],
      groupName: groupname,
      groupMessage: [message],
    });
  } catch (error) {
    return error.message;
  }
  return res.send("group created");
};

const getGroups = async (req, res) => {
  const { groupname } = req.body;
  const groupdata = await groupMessage.find({ groupName: groupname }).exec();
  return res.send(groupdata);
};

async function addToGroupMessage(req, res) {
  const { groupName, message } = req.body;

  try {
    await groupMessage.findOneAndUpdate(
      { groupName: `${groupName}` },
      {
        $psuh: {
          message: message,
        },
      }
    );
  } catch (error) {
    return error.message;
  }
  return res.send("contact added");
}

module.exports = { createGroup, getGroups, addToGroupMessage };
