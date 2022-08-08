import { useContext } from "react";
import { ChatOpen } from "../app";
import profileImage from "../img/New-message-bro.svg";
import NewImage from "../img/new.png";

function ListOfContact() {
	const { listUser, finduser, setSelectUser, setchangeConvo, message } =
		useContext(ChatOpen);
	function SelectUser(user) {
		setSelectUser(user);
		setchangeConvo("chats");
	}

	function AllUser(index, user) {
		return (
			<>
				<div className="single-user" onClick={() => SelectUser(user)}>
					<div className="profileImage">
						<img className="profileImage" src={profileImage} alt="" />
					</div>
					<div className="userInfo">
						<h3 key={index}>
							{user}
							<br />
							<span className="recentMessage">last message</span>
						</h3>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="friends">
			{message.contact.length >= 1 ? null : (
				<>
					<div className="NoChats">
						<h1>Start A</h1> <img src={NewImage} alt="" />
						<h1>Chat</h1>
					</div>
				</>
			)}
			{message.contact?.map((user, index) => {
				if (!finduser) {
					return AllUser(index, user);
				}
				if (finduser === user) {
					return AllUser(index, user);
				}
				return (
					<>
						<div className="errorContact">
							<p>No Contact found</p>
							<p>Try add new contact</p>
						</div>
					</>
				);
			})}
		</div>
	);
}

export default ListOfContact;
