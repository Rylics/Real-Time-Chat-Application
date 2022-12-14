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
import Profile from "./commponent/Profile";
import { LogOut } from "./commponent/auth/LogOut";
import darkMode from "./img/darkmode.png";
import lightMode from "./img/lightmode.png";
import messageImage from "./img/messageImage.png";
import plusImage from "./img/plus.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import unknownProfile from "./img/unknownImage.jpg";
import ConvertImage from "./commponent/Api/ConvertImage";
import { Base64string } from "./commponent/Api/ConvertImage";

const socket = io.connect("http://localhost:4195");

function ChatApp() {
  const {
    selectUser,
    groups,
    setgroups,
    selectGroups,
    changeConvo,
    setShowProfile,
    listContact,
  } = useContext(ChatOpen);

  const [show, setshow] = useState(false);

  const [showMenu, setMenu] = useState(false);

  const [Mode, setMode] = useState("off");

  const [showFeature, setshowFeature] = useState(false);

  function Hideheader() {
    setshow(!show);
  }
  function showMenu_option() {
    setMenu(!showMenu);
  }

  function Callprofile() {
    setShowProfile(true);
  }
  // Convert the image from the database to readable png

  const newlist = listContact.findIndex((object) => {
    return object?.username === selectUser;
  });
  return (
    <>
      <div className="chat-container">
        <div className="section-left">
          <Profile socket={socket} />
          <div className="contact">
            <div className="sectionLeft-Header">
              <img
                src={
                  ConvertImage()
                    ? `data:image/png;base64,${ConvertImage()}`
                    : unknownProfile
                }
                alt="profileImage"
                className="profileImage"
                onClick={Callprofile}
              />

              <div className="Mode">
                <img
                  onClick={() => setMode(!Mode)}
                  className="ModeImage"
                  src={Mode ? lightMode : darkMode}
                  alt="switch"
                  style={{ background: "black" }}
                />
              </div>

              <div className="Menu-dot" onClick={showMenu_option}>
                <BiDotsVerticalRounded
                  style={{ width: "40px", height: "50px" }}
                />
              </div>

              {showMenu && (
                <div className="Menu-option">
                  <p>Profile</p>
                  <p>Status</p>
                  <p>Setting</p>
                  <p>Log out</p>
                </div>
              )}
            </div>

            {show ? null : <NavbarChat />}

            {show ? <BackButton setshow={setshow} show={show} /> : null}
            <Routes>
              <Route
                path="contact"
                element={<ListOfContact socket={socket} />}
              ></Route>

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
              <NavLink to={show ? "contact" : "morefeature"}>
                <img
                  onClick={Hideheader}
                  className="add-button"
                  src={show ? messageImage : plusImage}
                  alt="something"
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
                  <p style={{ marginLeft: "20px" }}>
                    {"Group Name: " + selectGroups.groupName} <br />
                    {selectGroups.description && (
                      <span>{selectGroups.description}</span>
                    )}{" "}
                  </p>
                </>
              )}

              <div className="chat-header-details">
                {changeConvo === "chats" && selectUser && (
                  <img
                    className="contactHeaderProfileImage"
                    src={`data:image/png;base64,${Base64string(newlist)}`}
                    alt="profileImage"
                  />
                )}
                <p>{selectUser}</p>
              </div>

              <LogOut />
            </div>
          </div>

          <Chat socket={socket} toUser={selectUser} />
        </div>
      </div>
    </>
  );
}

export default ChatApp;
