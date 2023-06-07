import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav
            className="
            navbar 
            navbar-expand-lg 
            bg-body-tertiary
            bg-dark border-bottom 
            -border-bottom-dark
        "
            data-bs-theme="dark">
            <div className="container-fluid">
                <div className="navbar-brand" href="#">
                    <Link
                        to="/"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="
                  fa-solid fa-cat 
                  d-inline-block align-text-top
                  text-decoration-none
                  text-white
                  bg-dark
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
                <div
                    className="
                collapse navbar-collapse
                justify-content-between"
                    id="navbarNav">
                    <div className="mx-auto">
                        <ul
                            className="
                        navbar-nav text-center
                        fw-bold
                        fs-5
                  ">
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
                            <Link to="/login" className="nav-link ">
                                <button className="btn btn-light">Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
