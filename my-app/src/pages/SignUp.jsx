import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SingUp() {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  function Submit() {
    if (password !== confirmPassword) {
      return seterrorMessage(401);
    }
    if (username && email && password) {
      setloading(true);
      axios
        .post("http://localhost:4195/signup", {
          username: username,
          password: password,
          email: email,
        })
        .then((res) => {
          setloading(false);
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
          setloading(false);
          console.log(error.message);
        });
    } else {
      seterrorMessage(406);
    }
  }

  useEffect(() => {
    seterrorMessage("");
  }, [username, email, password]);

  return (
    <>
      <div className="register-container">
        <div className="custom-shape-divider-top-1660488144">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="register-form">
          <h1 className="login-header">Sign Up</h1>

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
              <p className="errorMessage">UserName has already been taken</p>
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
              <p className="errorMessage">Password does not match</p>
            )}
            {errorMessage === 406 && (
              <p className="errorMessage">Please fill in all field</p>
            )}
          </div>

          <div className="signIn">
            <NavLink to="/">Already resigtered? SignIn</NavLink>
          </div>
          <button className="register-button" onClick={Submit}>
            {loading ? "Loading.." : "Submit"}
          </button>
        </div>
        <div class="curve-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}

export default SingUp;
