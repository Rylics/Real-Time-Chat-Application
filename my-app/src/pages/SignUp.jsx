import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SingUp() {
	const [email, setemail] = useState("");
	const [username, setusername] = useState("");

	const [password, setpassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [errorMessage, seterrorMessage] = useState("");

	const navigate = useNavigate();

	function Submit() {
		if (username && email && password === confirmPassword) {
			axios
				.post("http://localhost:4195/signup", {
					username: username,
					password: password,
					email: email,
				})
				.then((res) => {
					console.log(res);
					if (res.data === 409) {
						seterrorMessage(409);

						return;
					}
					if (res.data === 408) {
						seterrorMessage(408);
						return;
					}
					if (res.data === 401) {
						seterrorMessage(401);
						return;
					}
					if (res.data === 200) {
						navigate("/");
					}
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			console.log("filled in all filed");
		}
	}

	useEffect(() => {
		seterrorMessage("");
	}, [username, email, password]);

	return (
		<>
			<div className="register-container">
				<div className="register-form">
					<h1 className="register-header">Sign Up</h1>

					<div className="login-row">
						<label htmlFor="username">username</label>
						<br />
						<input
							value={username}
							onChange={(e) => setusername(e.target.value)}
							type="email"
							name="username"
							id="username"
							autoComplete="off"
						/>
						{errorMessage === 409 && (
							<p className="errorMessage">
								UserName Address has already been taken
							</p>
						)}
					</div>

					<div className="login-row">
						<label htmlFor="email">Email</label>
						<br />
						<input
							value={email}
							onChange={(e) => setemail(e.target.value)}
							type="email"
							name="email"
							id="email"
							autoComplete="off"
						/>
						{errorMessage === 408 && (
							<p className="errorMessage">
								Email Address has already been taken
							</p>
						)}
					</div>

					<div className="login-row">
						<label htmlFor="password">Password</label>
						<br />
						<input
							value={password}
							onChange={(e) => setpassword(e.target.value)}
							type="password"
							name="password"
							id="password"
							autoComplete="off"
						/>
					</div>
					<div className="login-row">
						<label htmlFor="password">Confirm Password</label>
						<br />
						<input
							value={confirmPassword}
							onChange={(e) => setconfirmPassword(e.target.value)}
							type="password"
							name="confirmpassword"
							id="password"
							autoComplete="off"
						/>
						{errorMessage === 401 && (
							<p className="errorMessage">
								The password confirmation does not match
							</p>
						)}
					</div>

					<div className="signIn">
						<NavLink to="/">Already resigtered? SignIn</NavLink>
					</div>
					<button className="register-button" onClick={Submit}>
						Submit
					</button>
				</div>
			</div>
		</>
	);
}

export default SingUp;
