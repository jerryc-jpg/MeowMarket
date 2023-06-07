import React, { useState } from "react";
import { attemptLogin, Register } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    setLoginError("");
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      const resultAction = await dispatch(attemptLogin(credentials));
      const success = resultAction.type.endsWith("/fulfilled");
      if (success) {
        navigate("/");
      } else {
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  const register = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(Register(credentials));
      const resultAction = await dispatch(attemptLogin(credentials));
      const success = resultAction.type.endsWith("/fulfilled");
      if (success) {
        navigate("/");
      } else {
        setLoginError("Username already in use. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setLoginError("An error occurred during registration. Please try again.");
    }
  };

  const invalidCredentials =
    credentials.username === "" || credentials.password === "";

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card shadow-2-strong"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <h2 className="mb-5">Login</h2>
              <form onSubmit={login}>
                <div className="form-outline mb-4">
                  <input
                    placeholder="Username"
                    value={credentials.username}
                    name="username"
                    onChange={onChange}
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="mb-2">
                  <button disabled={invalidCredentials} className="btn btn-primary btn-lg btn-block">Login</button>
                </div>
                <div>
                  <button onClick={register} disabled={invalidCredentials} className="btn btn-primary btn-lg btn-block">
                    Register
                  </button>
                </div>
              </form>
              {loginError && <div>{loginError}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
