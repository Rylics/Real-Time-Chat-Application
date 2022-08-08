import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChatOpen } from "../app";

function Login() {
	const [password, setpassword] = useState("");
	const [error, seterror] = useState(false);
	const [username, setusername] = useState("");
	const { settoken, message, setmessage, setprofilename } =
		useContext(ChatOpen);
	const navigate = useNavigate();
	function Submit() {
		if (username && password) {
			axios
				.post("http://localhost:4195/login", {
					username: username,
					password: password,
				})
				.then((res) => {
					setmessage(res.data);
					setprofilename(res.data.username);
					console.log(message);
				})
				.then(() => {
					settoken(true);
					navigate("/app");
				})
				.catch(() => {
					seterror(true);
					return seterror("UserName or Password is incorrect");
				});
		}
		setusername("");
		setpassword("");
	}

	useEffect(() => {
		seterror(false);
	}, [username, password]);
	return (
		<>
			<div className="login-container">
				<div className="login-form">
					<h1 className="login-header">Welcome</h1>
					<div className="login-row">
						<label htmlFor="username">User Name</label>
						<br />
						<input
							value={username}
							onChange={(e) => setusername(e.target.value)}
							type="text"
							name="username"
							id="username"
							autoFocus={true}
							autoComplete="off"
						/>
					</div>
					<div className="login-row">
						<label htmlFor="password">Password</label>
						<br />
						<input
							value={password}
							onChange={(e) => setpassword(e.target.value)}
							type="text"
							name="password"
							id="password"
							autoComplete="off"
						/>
					</div>
					{error && <p className="errorMessage">{error}</p>}
					<div className="forgot-password">
						<NavLink to="/signup">New user? Signup now</NavLink>
					</div>

					<button className="login-button" onClick={() => Submit()}>
						Login
					</button>
				</div>
			</div>
		</>
	);
}

export default Login;
