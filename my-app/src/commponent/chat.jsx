import { useContext, useEffect, useRef, useState } from "react";
import { ChatOpen } from "../app";
import sendImage from "../img/send.png";

function Chat({ socket, toUser }) {
	const [currentmessage, setcurrentmessage] = useState("");
	const [currentGroupMessage, setcurrentGroupMessage] = useState("");
	const [filterGroupMessage, setFilterGroupMessage] = useState([]);

	const scrolldown = useRef("");

	const currentTime = new Date().toLocaleTimeString();
	const numberTime = new Date().getTime();

	const {
		profilename,
		message,
		setmessage,
		filtermessage,
		setfiltermessage,
		changeConvo,
		groupmessage,
		setgroupmessage,

		selectGroups,
	} = useContext(ChatOpen);

	const sendMessage = async () => {
		if (currentmessage) {
			const messageData = {
				socket_id: socket.id,
				receiver: toUser,
				sender: profilename,
				message: currentmessage,
				time: currentTime,
				numberTime: numberTime,
			};
			await socket.emit("send_message", {
				username: message.username,
				message: messageData,
			});
			const addMessage = [...message.message, messageData];
			const newMessage = message;
			newMessage.message = [...addMessage];
			setmessage(newMessage);
			console.log(newMessage);

			setcurrentmessage("");
		}

		if (currentGroupMessage) {
			const groupData = {
				id: socket.id,
				reciever: selectGroups,
				groupID: selectGroups.groupID,
				groupName: selectGroups.groupName,
				sender: profilename,
				message: currentGroupMessage,
				time: currentTime,
				numberTime: numberTime,
			};

			// await socket.emit("sendGroupMessage", groupData);
			setgroupmessage([...groupmessage, groupData]);
			setcurrentGroupMessage("");
		}
	};

	// filter out the send and receiver message then combine the two and sort by the timezone
	function filterFunction() {
		const userchat = message.message.filter(
			(data) => profilename === data.sender && toUser === data.receiver,
		);
		const recieveChat = message.message.filter(
			(data) => toUser === data.sender && profilename === data.receiver,
		);
		const joinmessage = userchat.concat(recieveChat);
		const sortmessage = joinmessage.sort(
			(a, b) => a.message.numberTime - b.message.numberTime,
		);
		setfiltermessage(sortmessage);
	}

	function groupMessageFilter() {
		const groupMessage = groupmessage.filter(
			(oldmesssage) => oldmesssage.groupID === selectGroups.groupID,
		);

		setFilterGroupMessage(groupMessage);
	}

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setmessage((prev) => {
				const addMessage = [...prev.message, data];
				const newMessage = message;
				newMessage.message = [...addMessage];

				return newMessage;
			});
		});
		socket.on("receiveGroupMessage", (data) =>
			setgroupmessage((prev) => [...prev, data]),
		);

		return () => socket.off();
		// eslint-disable-next-line
	}, [socket]);

	useEffect(() => {
		filterFunction();

		// eslint-disable-next-line
	}, [message.message, toUser]);

	useEffect(() => {
		groupMessageFilter();
		// eslint-disable-next-line
	}, [groupmessage, selectGroups]);

	useEffect(() => {
		scrolldown.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "center",
		});
	}, [toUser, filtermessage, selectGroups, filterGroupMessage]);

	return (
		<>
			<div className="chat-body">
				<div className="chat-message" id={toUser ? null : "newfriend"}>
					{changeConvo === "chats" &&
						filtermessage?.map((data) => {
							return (
								<>
									<div
										className="message"
										id={toUser === data.sender ? "other" : "user"}
									>
										<p className="text">
											{data.message}
											<br />
											<span className="time">{data.time}</span>
										</p>
									</div>
								</>
							);
						})}

					{changeConvo === "groupChats" && (
						<>
							{filterGroupMessage?.map((message) => {
								return (
									<>
										{message.join && (
											<p className="joingroup">
												{message.join === profilename
													? "You Joined"
													: message.join + " Join Group"}
											</p>
										)}

										{message.message && (
											<div
												className="message"
												id={profilename === message.sender ? "user" : "other"}
											>
												<p className="name">
													{message.sender === profilename
														? "Me"
														: message.sender}
												</p>
												<p className="text">
													{message.message}
													<br />
													<span className="time">{message.time}</span>
												</p>
											</div>
										)}
									</>
								);
							})}
						</>
					)}
					<div ref={scrolldown}></div>
				</div>
			</div>

			<div className="chat-footer">
				<div className="chat-footer-wrapper">
					{changeConvo === "chats" && (
						<input
							className="messageInput"
							type="text"
							placeholder="Heyy.."
							value={currentmessage}
							onChange={(e) => setcurrentmessage(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && sendMessage()}
						/>
					)}

					{changeConvo === "groupChats" && (
						<input
							className="messageInput"
							type="text"
							placeholder="Heyy.."
							value={currentGroupMessage}
							onChange={(e) => setcurrentGroupMessage(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && sendMessage()}
						/>
					)}
					<button
						className={
							currentmessage || currentGroupMessage ? "sendButton" : null
						}
						disabled={currentmessage || currentGroupMessage ? false : true}
						onClick={sendMessage}
					>
						<img src={sendImage} alt="" />
					</button>
				</div>
			</div>
			{/* <Notification /> */}
		</>
	);
}

export default Chat;
