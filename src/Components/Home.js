import React from "react";
import { useSelector, useDispatch, } from "react-redux";
import { logout } from "../store";
import AllCats from "./AllCats";
import AllAccess from "./AllAccess";

const Home = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   console.log(auth);
   return (
      <div>
         <div className="text-center position-relative">
            <h1
               className="position-absolute start-50"
               style={{
                  top: "10%",
                  transform: "translateX(-50%)",
                  fontSize: "5rem",
                  opacity: "0.80"
               }}>
               Meow Market
            </h1>
            <img
               src="https://img.freepik.com/free-photo/cute-group-animals_23-2150104514.jpg?w=2000&t=st=1686176344~exp=1686176944~hmac=51a031621c81b9d653ddd7fc5c37d4b7f3b552e929eab4e98dfa584004fdd70a"
               alt="#"
               className="img-fluid w-100 opacity-85 mb-5"
            />
         </div>
         <div>
            <h1 className="text-center mb-3">FEATURED CATS</h1>
            <AllCats />
         </div>
      </div>
   );
};

export default Home;
