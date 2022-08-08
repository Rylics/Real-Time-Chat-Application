import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./commponent/auth/RequireAuth";
import ChatApp from "./main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export const ChatOpen = createContext();
export default function App() {
	const [changeConvo, setchangeConvo] = useState("chats");
	const [user, setuser] = useState("");
	const [listUser, setlistUser] = useState([]);
	const [profilename, setprofilename] = useState("");
	const [message, setmessage] = useState([]);
	const [filtermessage, setfiltermessage] = useState([]);
	const [selectUser, setSelectUser] = useState("");
	const [groups, setgroups] = useState([]);
	const [selectGroups, setSelectGroups] = useState("");
	const [groupmessage, setgroupmessage] = useState([]);
	const [groupID, setgroupID] = useState("");
	const [Notification, setNotification] = useState("");
	const [token, settoken] = useState(false);

	return (
		<>
			<ChatOpen.Provider
				value={{
					user,
					listUser,
					message,
					filtermessage,
					profilename,
					selectUser,
					groups,
					selectGroups,
					changeConvo,
					groupmessage,
					groupID,
					Notification,
					token,
					settoken,
					setNotification,
					setgroupID,
					setgroupmessage,
					setchangeConvo,
					setSelectGroups,
					setgroups,
					setSelectUser,
					setfiltermessage,
					setmessage,
					setlistUser,
					setuser,
					setprofilename,
				}}
			>
				<Router>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route element={<RequireAuth />}>
							<Route path="/app/*" element={<ChatApp />} />
						</Route>
					</Routes>
				</Router>
			</ChatOpen.Provider>
		</>
	);
}
