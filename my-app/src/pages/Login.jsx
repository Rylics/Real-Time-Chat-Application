import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChatOpen } from "../app";

function Login() {
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [username, setusername] = useState("");
  const { settoken, setmessage, setprofilename, setlistContact } =
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
          setlistContact(res.data.contact);
        })
        .then(() => {
          settoken(true);
          navigate("/app/contact");
        })
        .catch((error) => {
          console.log(error);
          if (!error.response) {
            seterror(true);
            return seterror("Server is down try again later");
          }
          if (error.response.status === 403) {
            seterror(true);
            return seterror("UserName or Password is incorrect");
          }
          if (error.response.status === 404) {
            seterror(true);
            return seterror("User not found");
          } else {
            seterror(true);
            return seterror("Network Error failed to login");
          }
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
        <div className="custom-shape-divider-top-1660488144">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
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
          {
            <p className={error ? "errorMessage" : "showErrorMessage"}>
              {error}
            </p>
          }
          <div className="forgot-password">
            <NavLink to="/signup">New user? Signup now</NavLink>
          </div>

          <button className="login-button" onClick={() => Submit()}>
            Login
          </button>

          <div className="curve-bottom">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
