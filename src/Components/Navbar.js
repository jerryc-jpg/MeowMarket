import React from "react";
import { Link } from "react-router-dom";



 const Navbar = () => {
    return (
        <nav>
              <Link to='/'>Home</Link>
              <Link to='/'>About</Link>
              <Link to='/cart'>Cart</Link>
              <div>
                <Link to='/login'>Login</Link>
              </div>
        </nav>
    )
} 

export default Navbar;