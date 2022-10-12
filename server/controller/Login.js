const Messages = require("../models/privateMessages");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  const { username, password } = req.body;
  const users = await Messages.findOne({ username: username }).exec();
  try {
    if (!users) {
      return res.sendStatus(404);
    }

    const macth = await bcrypt.compare(password, users.password);
    if (macth) {
      await users.save();
      return res.send(users);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    return res.send(error);
  }
};

module.exports = Login;
