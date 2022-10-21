import { useContext } from "react";
import { ChatOpen } from "../app";
import NewImage from "../img/new.png";
import unknownProfile from "../img/unknownImage.jpg";
import { useEffect } from "react";

function ListOfContact() {
  const {
    setSelectUser,
    setchangeConvo,
    listContact,
    setlistContact,
    OnlineUser,
    baseImage,
    updateChangeContactProfile,
    selectUser,
  } = useContext(ChatOpen);

  function SelectUser(user) {
    setSelectUser(user);
    setchangeConvo("chats");
  }

  useEffect(() => {
    setlistContact((prev) => {
      const reset = prev.map((user) => {
        if (selectUser === user.username) {
          return { ...user, notification: 0 };
        }
        return user;
      });
      return reset;
    });
    // eslint-disable-next-line
  }, [selectUser]);

  useEffect(() => {
    Contacts();
    // eslint-disable-next-line
  }, [listContact, OnlineUser, updateChangeContactProfile]);

  function Base64string(index) {
    const base64string = btoa(
      new Uint8Array(baseImage?.contact[index]?.profileImage?.data.data).reduce(
        function (data, byte) {
          return data + String.fromCharCode(byte);
        },
        ""
      )
    );
    return base64string;
  }

  function Contacts() {
    return (
      <>
        {listContact?.map((user, index) => {
          const online = OnlineUser?.find(
            (onlineuser) => onlineuser?.profilename === user?.username
          );
          return (
            <div
              className="single-user"
              key={index}
              onClick={() => SelectUser(user?.username)}
            >
              <div className="contectProfileImage">
                <img
                  className="contectProfileImage"
                  src={
                    baseImage.contact[index]?.profileImage
                      ? `data:image/png;base64,${Base64string(index)}`
                      : unknownProfile
                  }
                  alt="contectProfileImage"
                />
              </div>
              <div className="userInfo">
                <h3 key={index}>{user?.username}</h3>
                <div className="OnlineStatus">
                  <p>{online ? "online" : "offline"}</p>
                  {user?.notification > 0 && (
                    <div className="notify-other">{user?.notification}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="friends">
      {listContact?.length >= 1 ? null : (
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
