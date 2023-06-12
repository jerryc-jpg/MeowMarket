import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Navbar = () => {
   const user = useSelector((state) => state.auth);
   const cart = useSelector((state) => state.cart);
   const dispatch = useDispatch();
   const [sum, setSum] = useState(0);

   React.useEffect(() => {
      let list = [...cart.lineItems];
      if (list) {
         const totalQ = list.reduce((acc, curr) => {
            return (acc = acc + curr.quantity);
         }, 0);
         setSum(totalQ);
      }
   }, [cart]);

   const handleLogout = () => {
      dispatch(logout());
   };

   const renderAuthButtons = () => {
      if (user.username) {
         return (
            <>
               <div className="nav-item dropdown">
                  <a
                     className="nav-link dropdown-toggle"
                     data-bs-toggle="dropdown"
                     href="#"
                     role="button"
                     aria-haspopup="true"
                     aria-expanded="false">
                     Welcome Back, {user.username.toUpperCase()}
                  </a>
                  <div className="dropdown-menu text-center">
                     {user.isAdmin && (
                        <Link to="/users" className="dropdown-item">
                           Manage Users
                        </Link>
                     )}
                     <Link to="/profile" className="dropdown-item" href="#">
                        Profile
                     </Link>
                     <Link to="/orders" className="dropdown-item" href="#">
                        Orders
                     </Link>
                  </div>
               </div>
               <li className="nav-item">
                  <button className="btn btn-light ms-3" onClick={handleLogout}>
                     Logout
                  </button>
               </li>
            </>
         );
      } else {
         return (
            <li className="nav-item">
               <Link to="/login" className="nav-link">
                  <button className="btn btn-light ms-3">Login</button>
               </Link>
            </li>
         );
      }
   };

   return (
      <nav
         className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-bottom-dark d-flex sticky-top"
         data-bs-theme="dark">
         <div className="container-fluid">
            <div className="navbar-brand">
               <Link to="/" className="d-inline-block align-text-top text-decoration-none text-white">
                  <i className="fas fa-cat"></i> Meow Market
               </Link>
            </div>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <div className="mx-auto">
                  <ul className="navbar-nav text-center fw-bold fs-5 align-items-center">
                     <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">
                           Home
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to="/about">
                           About
                        </Link>
                     </li>
                  </ul>
               </div>
               <ul className="navbar-nav align-items-center">
                  <li className="nav-item d-flex align-items-center position-relative me-3">
                     <Link to="/cart" className="nav-link">
                        <i className="fas fa-shopping-cart fs-3 align-middle" style={{ color: "#ffffff" }}>
                           {sum ? (
                              <span className="position-absolute top-5 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1 fs-6">
                                 {sum}
                              </span>
                           ) : null}
                        </i>
                     </Link>
                  </li>
                  {renderAuthButtons()}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
