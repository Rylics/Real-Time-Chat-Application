import { NavLink } from "react-router-dom";

function NavbarChat() {
	return (
		<div className="catorgize-chat">
			<div className="chats">
				<NavLink to="listcontact">Chats</NavLink>
			</div>

			<div className="Groups">
				<NavLink to="groups">Groups</NavLink>
			</div>
			<div className="status">
				<NavLink to="status">Status</NavLink>
			</div>
		</div>
	);
}

export default NavbarChat;
