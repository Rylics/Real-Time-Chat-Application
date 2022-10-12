import backButton from "../img/back.png";
import ProfileImage from "../img/unknownImage.jpg";

export default function Profile({ showProfile, setShowProfile }) {
  return (
    <div className={`Profile-edit ${showProfile && "Profile-move"}`}>
      <div className="BackButton-container">
        <div className="backButton" onClick={() => setShowProfile(false)}>
          <img src={backButton} alt="backImage" /> <h4>Back</h4>
        </div>
      </div>
      <div className="Profile-edit-image-container">
        <img
          className="ProfileImage"
          src={ProfileImage}
          alt="ProfileImage"
          style={{ width: "200px" }}
        />
      </div>
      <div className="Profile-details-container">
        <div className="Profile-mini-container">
          <p>Your Name</p>
          <input type="text" />
        </div>
        <div className="Profile-mini-container-text">
          This is not your username or pin. This name will be visible to your.
          WhatsApp contact.
        </div>

        <div className="Profile-mini-container">
          <p>About</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}
