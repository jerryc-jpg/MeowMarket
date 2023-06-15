import React, { useState } from "react";
import { attemptLogin, registerUser, addToCart } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [registerError, setRegisterError] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    setRegisterError("");
  };

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      const registrationResult = await dispatch(registerUser(credentials));
      if (registrationResult.payload.error) {
        setRegisterError("Username or Email already in use. Please try again.");
        return;
      }
  
      const loginResult = await dispatch(attemptLogin(credentials));
      if (loginResult.payload) {

        setTimeout(async() =>{ const visitorOrder = JSON.parse(window.localStorage.getItem('visitorOrder'));
        // console.log('after login visitorOrder:',visitorOrder);
          const token = window.localStorage.getItem('token');
          // console.log('after login token:',token)
          if(visitorOrder){
          //await visitorOrder.forEach(async(ele)=>{console.log('element:',ele); await dispatch(addToCart(ele));});
          
          for (const ele of visitorOrder) {
            console.log('element:', ele);
            await dispatch(addToCart(ele));
          }
          window.localStorage.removeItem('visitorOrder');
          }
         },500)

        navigate("/");


      } else {
        setRegisterError("An error occurred during login. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError("An error occurred during registration. Please try again.");
    }
  };
  

  const invalidCredentials =
    credentials.username === "" || credentials.password === "" || credentials.email === "";

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
                        placeholder="Email" 
                        type="email" 
                        name="email" 
                        value={credentials.email}
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