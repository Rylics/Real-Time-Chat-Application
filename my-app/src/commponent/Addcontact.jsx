import axios from "axios";
import { useContext } from "react";
import { ChatOpen } from "../app";
import AddcontactImage from "../img/addContact.png";

export default function Addcontact() {
	const { user, listUser, setuser, setlistUser, profilename } =
		useContext(ChatOpen);
	function saveFriend() {
		if (user) {
			setlistUser([...listUser, user]);
			axios.post("http://localhost:4195/addcontact", {
				username: profilename,
				add: user,
			});
			setuser("");
		}
	}

	return (
		<>
			<div className="addfriend-container">
				<h3 className="addcontactHeader">Add New Contact</h3>
				<div className="addContact">
					<input
						className="messageInput"
						type="text"
						placeholder="Example: John"
						value={user}
						autoFocus
						onChange={(e) => setuser(e.target.value)}
						onKeyDown={(e) => e.code === "Enter" && saveFriend()}
					/>

					<img
						onClick={saveFriend}
						className="save-button"
						src={AddcontactImage}
						alt=""
					/>
				</div>
			</div>
		</>
	);
}
