const Messages = require("../models/messages");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
	const { username, password } = req.body;

	const users = await Messages.findOne({ username: username }).exec();
	try {
		const macth = await bcrypt.compare(password, users.password);

		if (macth) {
			await users.save();
			res.send(users);
		}
	} catch (error) {
		return res.sendStatus(403);
	}
};

module.exports = Login;
