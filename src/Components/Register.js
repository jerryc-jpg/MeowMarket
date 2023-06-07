import React, { useState } from "react";
import { attemptLogin, registerUser } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    setRegisterError("");
  };

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(registerUser(credentials));
      const resultAction = await dispatch(attemptLogin(credentials));
      const success = resultAction.type.endsWith("/fulfilled");
      if (success) {
        navigate("/");
      } else {
        setRegisterError("Username already in use. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError("An error occurred during registration. Please try again.");
    }
  };

  const invalidCredentials =
    credentials.username === "" || credentials.password === "";

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://img.freepik.com/free-photo/isolated-closeup-shot-gray-cat-looking-into-camera_181624-60601.jpg?w=826&t=st=1686164569~exp=1686165169~hmac=5388beeda2e1479f832ab1556f1e3283a1fd995c6f96e7f96d2548c7753dc34e"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <h2 className="mb-5 text-center">Create an Account</h2>
                  <form onSubmit={handleRegister}>
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
                    <div className="mb-2 d-grid">
                      <button
                        disabled={invalidCredentials}
                        className="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  {registerError && <div>{registerError}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;