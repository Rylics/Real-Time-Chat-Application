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
    const finduser = await Messages.findOne({ username: add }).exec();

    if (!finduser) {
      return res.sendStatus(404);
    }
    const data = await Messages.findOneAndUpdate(
      { username: `${username}` },
      {
        $addToSet: {
          contact: {
            username: add,
            profileImage: {
              data: finduser.profileImage.data,
              contentType: finduser.profileImage.contentType,
            },
            notification: 0,
          },
        },
      }
    );

    return res.send(data);
  } catch (error) {
    return error.message;
  }
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
  } catch (error) {
    return console.log(error.message);
  }
  await users.save();
};

const UpdateProfileImage = async (req, res) => {
  const { username } = req.body;

  try {
    const users = await Messages.findOne({ username: username }).exec();
    res.send(users);
  } catch (error) {
    return error.message;
  }
};

const Get = async (req, res) => {
  const { username } = req.body;

  try {
    const users = await Messages.findOne({ username: username }).exec();
    res.send(users);
  } catch (error) {
    return error.message;
  }
};
module.exports = {
  UpdateProfileImage,
  Update,
  Delete,
  Addcontact,
  AddMessage,
  Get,
};
