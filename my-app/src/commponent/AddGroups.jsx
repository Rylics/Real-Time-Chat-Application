import { useContext, useState } from "react";
import { ChatOpen } from "../app";
import groupsImage from "../img/groups.png";

export function ListGroups() {
	const { setSelectGroups, setchangeConvo, groups } = useContext(ChatOpen);
	function SelectGroup(group) {
		setSelectGroups({
			groupID: group.groupID,
			groupName: group.groupName,
			description: group.description,
		});
		setchangeConvo("groupChats");
	}
	return (
		<>
			{groups.length >= 1 ? null : (
				<div className="Nogroups">
					<h1>Create or Join A New</h1>
					<img src={groupsImage} alt="" />
					<h1>Group</h1>
				</div>
			)}
			{groups?.map((singleGroup, index) => {
				return (
					<>
						<div
							key={index}
							onClick={() => SelectGroup(singleGroup)}
							className="group"
						>
							<h2>{singleGroup.groupName}</h2>
						</div>
					</>
				);
			})}
		</>
	);
}

export function AddGroups({ groups, setgroups, socket }) {
	const { groupID, setgroupID, profilename } = useContext(ChatOpen);

	const [groupName, setgroupName] = useState("");
	const [description, setdescription] = useState("");
	// const [imageUpload, setimageUpload] = useState("");
	const { user } = useContext(ChatOpen);

	async function Save() {
		if (groupName && groupID) {
			setgroups([...groups, { groupName, groupID, user, description }]);

			await socket.emit("createGroup", { groupName, groupID, profilename });
		}
		setgroupID("");
		setdescription("");
		setgroupName("");
	}

	return (
		<>
			<div className="groupsForm">
				<div className="groupsForm-wrapper">
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

					<h3>Description</h3>
					<input
						type="text"
						className="description"
						placeholder="Described group information"
						value={description}
						onChange={(e) => setdescription(e.target.value)}
					/>
				</div>
				<button
					className="createGroupButton"
					onClick={() => Save()}
					disabled={groupID && groupName ? false : true}
				>
					Create Group
				</button>
			</div>
		</>
	);
}
