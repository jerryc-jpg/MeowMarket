import React from "react";
import { useSelector, useDispatch, } from "react-redux";
import { logout } from "../store";
import AllCats from "./AllCats";
import { Link } from "react-router-dom";

const Home = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   return (
      <div>
         <h1>Meow Market</h1>
         <div>
            {auth.username ? (
               <div>
                  Welcome {auth.username}
                  <button onClick={() => dispatch(logout())}>Logout</button>
               </div>
            ) : (
               <div>Please Login</div>
            )}
         </div>
         <AllCats />
      </div>
   );
};

export default Home;
