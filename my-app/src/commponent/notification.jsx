// import { useContext, useEffect, useState } from "react";
// import { ChatOpen } from "../app";

// function Notification() {
// 	const [getlength, setlength] = useState("");
// 	const [lastNote, setlastNote] = useState([]);
// 	const {
// 		groupmessage,
// 		selectGroups,
// 		profilename,
// 		setNotification,
// 		Notification,
// 		selectUser,
// 	} = useContext(ChatOpen);

// 	const lastNotification = () => {
// 		const getnotification = groupmessage.filter(
// 			(oldmesssage) => oldmesssage.groupID === selectGroups.groupID,
// 		);
// 		setlastNote(getnotification);
// 		const length = getnotification.length >= 1 ? getnotification.length - 1 : 0;

// 		console.log(lastNote[getlength]?.groupName);

// 		setlength(length);
// 		if (getnotification[length]?.from !== profilename) {
// 			setNotification(getnotification[length]);
// 		}
// 	};

// 	const closeNotification = () => {
// 		setNotification("");
// 	};

// 	useEffect(() => {
// 		lastNotification();

// 		// eslint-disable-next-line
// 	}, [groupmessage, selectGroups, selectUser]);

// 	return (
// 		<>
// 			{selectGroups.groupName !== lastNote[getlength]?.groupName && (
// 				<div className="notification" id={"showNotification"}>
// 					<div className="notificationMessage">{Notification?.message}</div>
// 					<button className="closeNotification" onClick={closeNotification}>
// 						X
// 					</button>
// 				</div>
// 			)}
// 		</>
// 	);
// }

// export default Notification;
