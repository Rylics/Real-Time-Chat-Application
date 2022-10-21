import axios from "axios";

import { useEffect } from "react";
import { useContext, useState } from "react";
import { ChatOpen } from "../app";
import AddcontactImage from "../img/addContact.png";

export default function Addcontact() {
  const {
    setNewcontact,
    Newcontact,
    setlistContact,
    profilename,
    listContact,
    setbaseImage,
  } = useContext(ChatOpen);

  const [searchContact, setsearchContact] = useState();
  const [loading, setloading] = useState(false);

  async function saveFriend() {
    const contactExist = listContact?.find(
      (user) => Newcontact === user.username
    );

    if (contactExist) {
      return setsearchContact(3);
    }

    if (Newcontact) {
      setloading(true);
      axios
        .post("http://localhost:4195/addcontact", {
          username: profilename,
          add: Newcontact,
        })
        .then((res) => {
          setNewcontact("");
          setloading(false);

          axios
            .post(" http://localhost:4195/get", {
              username: profilename,
            })
            .then((res) => {
              setbaseImage(res.data);
              setlistContact(res.data.contact);
            });

          return setsearchContact(1);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            setloading(false);
            return setsearchContact(2);
          }
        });
    }
  }

  useEffect(() => {
    setsearchContact("");
  }, [Newcontact]);

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
        {searchContact === 3 && "Already in your contact"}
        {searchContact === 1 && "Contact added"}
        {searchContact === 2 && "Not found"}
        {loading && "Loading..."}
      </div>
    </>
  );
}
