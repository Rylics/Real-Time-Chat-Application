import { useContext, useState } from "react";
import { ChatOpen } from "../app";

function JoinGroup({ socket }) {
	const [groupName, setgroupName] = useState("");

	const {
		groups,
		setgroups,

		groupID,
		setgroupID,
		profilename,
		groupmessage,
		setgroupmessage,
	} = useContext(ChatOpen);

	async function JoinCurrentGroup() {
		const numberTime = new Date().getTime();
		if (groupName && groupID) {
			await socket.emit("joinGroup", { groupName, groupID, profilename });
			setgroups([...groups, { groupName, groupID }]);

			await socket.emit("sendGroupMessage", {
				groupName,
				groupID,
				join: profilename,
				numberTime,
			});
			// setjoingroup({ groupName, groupID, join: profilename, numberTime });
			setgroupmessage([
				...groupmessage,
				{ groupName, groupID, join: profilename, numberTime },
			]);
			setgroupName("");
			setgroupID("");
		}
	}
	return (
		<>
			<div className="groupsForm">
				<div className="groupsForm-wrapper">
					<h2>Join Group</h2>
					<h3>Group Name</h3>
					<input
						type="text"
						placeholder="Example: FifaGroup"
						value={groupName}
						autoFocus
						onChange={(e) => setgroupName(e.target.value)}
					/>

					<h3>Group ID</h3>
					<input
						type="text"
						placeholder="Example: 123"
						value={groupID}
						onChange={(e) => setgroupID(e.target.value)}
					/>
				</div>
				<button
					className="createGroupButton"
					onClick={JoinCurrentGroup}
					disabled={groupID && groupName ? false : true}
				>
					Join Group
				</button>
			</div>
		</>
	);
}

export default JoinGroup;
