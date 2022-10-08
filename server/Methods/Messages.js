const Messages = require("../models/privateMessages");

const AddMessage = async (req, res) => {
  const { username, message } = req.body;
  await Messages.findOneAndUpdate(
    { username: username },
    {
      $push: {
        message: message,
      },
    }
  );
};

const Addcontact = async (req, res) => {
  const { add, username } = req.body;
  try {
    await Messages.findOneAndUpdate(
      { username: `${username}` },
      {
        $addToSet: {
          contact: add,
        },
      }
    );
  } catch (error) {
    return error.message;
  }
  return res.send("contact added");
};

const Delete = async (req, res) => {
  const { name } = req.body;
  const users = Messages.deleteOne(name);
  await users.save();
};

const Update = async (req, res) => {
  const { usename, profilename } = req.body;
  const users = await Messages.findById(profilename).exec();

  try {
    users.contact = usename;
    res.send("Sucessful update");
    console.log(users);
  } catch (error) {
    return console.log(error.message);
  }
  await users.save();
};

const Get = async (req, res) => {
  const users = Messages.find({}, (error, user) => {
    try {
      res.send(user);
    } catch (error) {
      return error.message;
    }
  });
};

module.exports = {
  Get,
  Update,
  Delete,
  Addcontact,

  AddMessage,
};
