import axios from "axios";
import { useContext } from "react";
import { ChatOpen } from "../app";
import AddcontactImage from "../img/addContact.png";

export default function Addcontact() {
  const {
    setNewcontact,
    Newcontact,
    setlistContact,
    profilename,

    listContact,
  } = useContext(ChatOpen);

  function saveFriend() {
    if (Newcontact) {
      const NewContactAdded = [...listContact, Newcontact];
      setlistContact(NewContactAdded);

      axios.post("http://localhost:4195/addcontact", {
        username: profilename,
        add: Newcontact,
      });
      setNewcontact("");
    }
  }

  return (
    <>
      <div className="addfriend-container">
        <h3 className="addcontactHeader">Add New Contact</h3>
        <div className="addContact">
          <input
            className="messageInput"
            type="text"
            placeholder="Example: John"
            value={Newcontact}
            autoFocus
            onChange={(e) => setNewcontact(e.target.value)}
            onKeyDown={(e) => e.code === "Enter" && saveFriend()}
          />

          <img
            onClick={saveFriend}
            className="save-button"
            src={AddcontactImage}
            alt="AddContactButton"
          />
        </div>
      </div>
    </>
  );
}
