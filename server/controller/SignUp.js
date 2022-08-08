const Messages = require("../models/messages");
const bcrypt = require("bcrypt");

const UserAccount = async (req, res) => {
	const { username, password, email } = req.body;
	try {
		if (!username || !password || !email) {
			return res.send("filled in all feilds");
		}

		const users = await Messages.findOne({ username: username }).exec();
		if (users) {
			console.log("This Username is already in use");
			return res.send("409");
		}

		const usersEmail = await Messages.findOne({ email: email }).exec();
		if (usersEmail) {
			console.log("This Email is already in use");
			return res.send("408");
		}
		const salt = await bcrypt.genSalt(10);
		const hashpwd = await bcrypt.hash(password, salt);

		const user = new Messages({
			username: username,
			password: hashpwd,
			email: email,
		});

		await user.save();
		console.log(user);
		return res.send("200");
	} catch (error) {
		console.log(error.messsage);
		return res.send("401");
	}
};

module.exports = UserAccount;
