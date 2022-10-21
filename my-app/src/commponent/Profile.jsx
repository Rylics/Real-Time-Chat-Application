import unknownProfile from "../img/unknownImage.jpg";
import ConvertImage from "./Api/ConvertImage";
import { useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { ChatOpen } from "../app";
import { BiChevronsLeft } from "react-icons/bi";

export default function Profile({ socket }) {
  const [FileStore, setFileStore] = useState([]);

  const [updatPic, setupdatPic] = useState(0);
  const [showUploadProfile, setshowUploadProfile] = useState(true);

  const {
    profilename,
    setbaseImage,
    showProfile,
    setShowProfile,
    setlistContact,
    setupdateChangeContactProfile,
    updateChangeContactProfile,
  } = useContext(ChatOpen);

  // const [image, setimage] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", FileStore);
    formData.append("username", profilename);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    if (FileStore) {
      const sendFile = {
        type: "file",
        body: FileStore,
        mineType: FileStore.type,
        filename: FileStore.name,
      };

      socket.emit("Sendfile", sendFile);
    }

    axios
      .put("http://localhost:4195/uploads", formData, config)
      .then((res) => {
        setFileStore("");
        setupdatPic(updatPic + 1);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .put("http://localhost:4195/updateAllprofilePic", formData, config)
      .then((res) => {
        socket.emit("SendUpdatedProfile", profilename);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  socket.on("RecievedUpdatedProfile", (data) => {
    axios
      .post("http://localhost:4195/updateprofile:Image", {
        username: profilename,
      })
      .then((res) => {
        setlistContact(res.data.contact);
        setbaseImage(res.data);
      })
      .then(() => {
        setupdateChangeContactProfile([...updateChangeContactProfile, data]);
      })
      .catch((err) => console.log(err.message));
  });

  useEffect(() => {
    axios
      .post("http://localhost:4195/updateprofile:Image", {
        username: profilename,
      })
      .then((res) => {
        setbaseImage(res.data);
        setlistContact(res.data.contact);
        setshowUploadProfile(true);
      })
      .catch((err) => console.log(err.message));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatPic]);

  function onchangeFile(e) {
    setFileStore(e.target.files[0]);
    setshowUploadProfile(false);
  }

  // socket.on("Sendfile", (data) => {
  //   const blob = new Blob([data.body], { type: data.type });
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //     setimage(reader.result);
  //   };
  // });

  return (
    <div className={`Profile-edit ${showProfile && "Profile-move"}`}>
      <div className="BackButton-container">
        <div className="backButton" onClick={() => setShowProfile(false)}>
          <BiChevronsLeft style={{ width: "30px" }} /> Back
        </div>
      </div>
      <div className="Profile-edit-image-container">
        <img
          className="ProfileImage"
          src={
            ConvertImage()
              ? `data:image/png;base64,${ConvertImage()}`
              : unknownProfile
          }
          alt="ProfileImage"
          style={{ width: "200px" }}
        />
      </div>

      <div className="Profile-details-container">
        <form className="profile-form" onSubmit={onFormSubmit}>
          {showUploadProfile === true && (
            <input
              className="uploadInput"
              type="file"
              filename="image"
              onChange={onchangeFile}
            />
          )}
          {showUploadProfile === false && (
            <button className="uploadButton" type="submit">
              Upload
            </button>
          )}
        </form>
        <div className="Profile-mini-container">
          <p>Your name {profilename}</p>
          <input type="text" />
        </div>
        <div className="Profile-mini-container-text">
          This is not your username or pin. This name will be visible to your.
          WhatsApp contact.
        </div>

        <div className="Profile-mini-container">
          <p>About</p>
          <input type="text" />
          {/* <img src={image && image} alt="tyr a ting" /> */}
        </div>
      </div>
    </div>
  );
}
