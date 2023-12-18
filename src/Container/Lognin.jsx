import "../App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import "../Container/LogIn/Login.css";

const Lognin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const storedUserData = JSON.parse(localStorage.getItem("UserData"));

    if (
      storedUserData &&
      storedUserData.some((data) => {
        return data.email === username && data.password === password;
      })
    ) {
      setTimeout(() => {
        navigate("/table-component");
        setLoading(false);
      }, 10000);
    } else {
      setLoginError("Invalid username or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 style={{ textAlign: "center" }}>Login Form</h1>
        <div className="input-container">
          <label>UserName:</label>
          <input
            type=""
            value={username}
            autoComplete="on"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="Password"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {loginError && <div className="error-message">{loginError}</div>}

        <div className="button-container">
          <button onClick={handleLogin}>Login</button>
        </div>
        <p className="signup">
          Don't have an account?{""}
          <span className="signup-text" onClick={() => navigate("/sign-up")}>
            Sign up
          </span>
        </p>

        {loading && (
          <div className="loader">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default Lognin;
