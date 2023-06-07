import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
         <div className="container-fluid">
            <div className="navbar-brand" href="#">
               <Link
                  to="/"
                  alt="Logo"
                  width="30"
                  height="24"
                  className="fa-solid fa-cat 
                  d-inline-block align-text-top
                  text-decoration-none
                  ">
                  Meow Market
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
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
               <div className="mx-auto">
                  <ul className="navbar-nav text-center">
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
                     <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                           Cart
                        </Link>
                     </li>
                  </ul>
               </div>
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link" to="/login">
                        <button className="btn btn-primary">Login</button>
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
