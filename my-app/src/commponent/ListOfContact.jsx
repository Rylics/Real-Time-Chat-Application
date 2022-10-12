import { useContext } from "react";
import { ChatOpen } from "../app";
import profileImage from "../img/New-message-bro.svg";
import NewImage from "../img/new.png";
import { useEffect } from "react";

function ListOfContact() {
  const { setSelectUser, setchangeConvo, listContact, OnlineUser } =
    useContext(ChatOpen);

  function SelectUser(user) {
    setSelectUser(user);
    setchangeConvo("chats");
  }

  console.log(OnlineUser);
  useEffect(() => {
    Contacts();
    // eslint-disable-next-line
  }, [listContact, OnlineUser]);

  function Contacts() {
    return (
      <>
        {listContact?.map((user, index) => {
          const online = OnlineUser.find(
            (onlineuser) => onlineuser.profilename === user
          );
          return (
            <div
              className="single-user"
              key={index}
              onClick={() => SelectUser(user)}
            >
              <div className="profileImage">
                <img
                  className="profileImage"
                  clear
                  src={profileImage}
                  alt="ProfileImage"
                />
              </div>
              <div className="userInfo">
                <h3 key={index}>{user}</h3>
                <h5> {online ? "online" : "offline"}</h5>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="friends">
      {listContact.length >= 1 ? null : (
        <>
          <div className="NoChats">
            <h1>Start A</h1> <img src={NewImage} alt="NewImage" />
            <h1>Chat</h1>
          </div>
        </>
      )}
      <Contacts />
    </div>
  );
}

export default ListOfContact;
