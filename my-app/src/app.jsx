import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./commponent/auth/RequireAuth";
import ChatApp from "./main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export const ChatOpen = createContext();
export default function App() {
  const [changeConvo, setchangeConvo] = useState("chats");
  const [Newcontact, setNewcontact] = useState("");
  const [listContact, setlistContact] = useState([]);
  const [profilename, setprofilename] = useState("");
  const [message, setmessage] = useState([]);
  const [selectUser, setSelectUser] = useState("");
  const [groups, setgroups] = useState([]);
  const [selectGroups, setSelectGroups] = useState("");
  const [groupmessage, setgroupmessage] = useState([]);
  const [groupID, setgroupID] = useState("");
  const [token, settoken] = useState(false);
  const [OnlineUser, setOnlineUSer] = useState([]);
  const [baseImage, setbaseImage] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [updateChangeContactProfile, setupdateChangeContactProfile] = useState(
    []
  );

  return (
    <>
      <ChatOpen.Provider
        value={{
          updateChangeContactProfile,
          setupdateChangeContactProfile,
          Newcontact,
          OnlineUser,
          setOnlineUSer,
          baseImage,
          setbaseImage,
          listContact,
          showProfile,
          setShowProfile,
          message,
          profilename,
          selectUser,
          groups,
          selectGroups,
          changeConvo,
          groupmessage,
          groupID,
          token,
          settoken,
          setgroupID,
          setgroupmessage,
          setchangeConvo,
          setSelectGroups,
          setgroups,
          setSelectUser,
          setmessage,
          setlistContact,
          setNewcontact,
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
