import { useContext, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { ChatOpen } from "./app";
import Addcontact from "./commponent/Addcontact";
import { AddGroups, ListGroups } from "./commponent/AddGroups";
import Chat from "./commponent/chat";
import JoinGroup from "./commponent/JoinGroup";
import ListOfContact from "./commponent/ListOfContact";
import MoreFeature, { BackButton } from "./commponent/MoreFeature";
import NavbarChat from "./commponent/NavbarChat";
import darkMode from "./img/darkmode.png";
import lightMode from "./img/lightmode.png";
import messageImage from "./img/messageImage.png";
import plusImage from "./img/plus.png";

const socket = io.connect("http://localhost:4195");

function ChatApp() {
	const { selectUser, groups, setgroups, selectGroups, changeConvo } =
		useContext(ChatOpen);

	const [show, setshow] = useState(false);
	const [open, close] = useState(false);
	const [finduser, setfinduser] = useState("");

	const [Mode, setMode] = useState("off");

	const [showFeature, setshowFeature] = useState(false);

	function Hideheader() {
		setshow(!show);
	}

	return (
		<>
			<div className="chat-container">
				<div className="section-left">
					<div className="contact">
						<div className="sectionLeft-Header">
							<div className="Mode">
								<img
									onClick={() => setMode(!Mode)}
									className="ModeImage"
									src={Mode ? lightMode : darkMode}
									alt="switch"
								/>
							</div>
							<input
								className="searchInput"
								type="text"
								placeholder="Search Contact"
								value={finduser}
								onChange={(e) => setfinduser(e.target.value)}
							/>
						</div>

						{show ? null : <NavbarChat />}

						{show ? <BackButton setshow={setshow} show={show} /> : null}
						<Routes>
							<Route path="/" element={<ListOfContact />}></Route>

							<Route path="status" element={<h3>Status</h3>}></Route>
							<Route
								path="morefeature"
								element={<MoreFeature show={show} />}
							></Route>
							<Route
								path="groups"
								element={<ListGroups groups={groups} />}
							></Route>
							<Route
								path="morefeature/addGroups"
								element={
									<AddGroups
										groups={groups}
										setgroups={setgroups}
										socket={socket}
									/>
								}
							></Route>
							<Route
								path="morefeature/addContact"
								element={<Addcontact />}
							></Route>
							<Route
								path="morefeature/joinGroup"
								element={<JoinGroup socket={socket} />}
							></Route>
						</Routes>
					</div>

					{show === "morefeature" && (
						<MoreFeature
							setshowFeature={setshowFeature}
							showFeature={showFeature}
							socket={socket}
							setshow={setshow}
							show={show}
						/>
					)}

					<div className="add-friends">
						<div>
							<NavLink to={show ? "listcontact" : "morefeature"}>
								<img
									onClick={Hideheader}
									className="add-button"
									src={show ? messageImage : plusImage}
									alt=""
								/>
							</NavLink>
						</div>
					</div>
				</div>
				<div className="section-right">
					<div className="chat-header">
						<div className="message-header">
							{changeConvo === "groupChats" && (
								<>
									<p>
										{"Group Name: " + selectGroups.groupName} <br />
										{selectGroups.description && (
											<span>{selectGroups.description}</span>
										)}{" "}
									</p>
								</>
							)}

							{changeConvo === "chats" && selectUser}
						</div>
					</div>

					<Chat socket={socket} toUser={selectUser} open={open} close={close} />
				</div>
			</div>
		</>
	);
}

export default ChatApp;
