import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import AllCats from "./AllCats";
import Profile from "./Profile";
import AllAccess from "./AllAccess";

const Home = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index) => {
      setActiveTab(index);
   };

   return (
      <div>
         <div className="text-center position-relative">
            <h1
               className="fas fa-cat position-absolute start-50"
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
         <br />
         <div className="d-flex justify-content-center mb-3">
            <h2
               className={`text-center mb-3 me-3 custom-pointer ${activeTab === 0 ? "active" : ""}`}
               onClick={() => handleTabClick(0)}>
               FEATURED CATS
            </h2>
            <h2
               className={`text-center mb-3 custom-pointer ${activeTab === 1 ? "active" : ""}`}
               onClick={() => handleTabClick(1)}>
               FEATURED ACCESSORIES
            </h2>
         </div>
         {activeTab === 0 ? <AllCats /> : <AllAccess />}
         <Profile />
      </div>
   );
};

export default Home;
