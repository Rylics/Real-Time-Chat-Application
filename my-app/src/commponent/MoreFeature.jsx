import { NavLink, useLocation, useNavigate } from "react-router-dom";
import backImage from "../img/back.png";
import groupImage from "../img/groupUser.png";
import JoinGroupImage from "../img/joingroup.png";
import userImage from "../img/user.png";

export function BackButton({ show, setshow }) {
	const navigate = useNavigate();
	const location = useLocation();

	function PreviousPage() {
		if (location.pathname === "/app/morefeature") {
			navigate(-1);
			setshow(!show);
			return 0;
		}
		navigate(-1);
	}
	return (
		<>
			<div className="BackButton-container">
				<div onClick={PreviousPage} className="backButton">
					<img src={backImage} alt="backImage" /> <h4>Back</h4>
				</div>
			</div>
		</>
	);
}

function MoreFeature() {
	return (
		<>
			<div className="MoreFeature-container">
				<div className="MoreFeature">
					<NavLink to="addContact">
						<div className="New-contact">
							New Contact
							<img src={userImage} alt="" />
						</div>
					</NavLink>
					<NavLink to="addGroups">
						<div className="New-group">
							Create Group
							<img src={groupImage} alt="" />
						</div>
					</NavLink>
					<NavLink to="joinGroup">
						<div className="Join-Group">
							Join Group
							<img src={JoinGroupImage} alt="" />
						</div>
					</NavLink>
				</div>
			</div>
		</>
	);
}

export default MoreFeature;
