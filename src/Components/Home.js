import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import AllCats from "./AllCats";
import Profile from "./Profile";
import AllAccess from "./AllAccess";

const Home = () => {
   //test window.localStorage whether behave correctly, (stored item able to be retrieval between pages)
   // console.log('home:try to find visitor order and token ')
   // const visitorOrderString=window.localStorage.getItem('visitorOrder');
   // const token=window.localStorage.getItem('toekn');
   // if(visitorOrderString){
   //    console.log('home:line13.home visitor order:',JSON.parse(visitorOrderString));
   // }
   // if(token){
   //    console.log('line16 token:',token)
   // }
   // console.log('line17,already check token and visitor order');

   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   const [activeTab, setActiveTab] = useState(0);
   const [filter, setFilter] = useState("");

   const handleTabClick = (index) => {
      setActiveTab(index);
   };

   const handleFilterChange = (ev) => {
      setFilter(ev.target.value);
   };

   return (
      <div>
         <div className="text-center position-relative">
            <div className="rotating-Element">
               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/2913/2913281.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/8036/8036753.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/6630/6630399.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/7966/7966003.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/8036/8036753.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/2913/2913281.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/8036/8036753.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/7966/7966003.png" alt="Cereal Box" />
               </span>

               <span aria-hidden="true" data-multiply="2">
                  <img src="https://cdn-icons-png.flaticon.com/512/6630/6630399.png" alt="Cereal Box" />
               </span>
            </div>
            <h1
               className="fas fa-cat position-absolute start-50"
               style={{
                  top: "10%",
                  transform: "translateX(-50%)",
                  fontSize: "5.5rem",
                  opacity: "0.80",
                  letterSpacing: "3px",
                  color: "#edede9"
               }}>
               <span
                  style={{
                     fontWeight: "bold",
                     fontBorder: "1px solid black"
                  }}>
                  {" "}
                  Meow Market
               </span>
            </h1>
            {/*<img
          src="https://img.freepik.com/free-photo/cute-group-animals_23-2150104514.jpg?w=2000&t=st=1686176344~exp=1686176944~hmac=51a031621c81b9d653ddd7fc5c37d4b7f3b552e929eab4e98dfa584004fdd70a"
          alt="#"
          className="img-fluid w-100 opacity-85 mb-5"
        /> */}
            <img
               src="https://cdn.pixabay.com/photo/2017/08/01/08/53/cat-2563681_1280.jpg"
               alt="#"
               className="img-fluid w-100 opacity-85 mb-5"
            />
         </div>
         <br />
         <div className="d-flex justify-content-center mb-3">
            <h3
               className={`text-center mb-2 me-3 custom-pointer ${activeTab === 0 ? "active" : ""}`}
               onClick={() => handleTabClick(0)}>
               FEATURED CATS
            </h3>
            <h3
               className={`text-center mb-2 custom-pointer ${activeTab === 1 ? "active" : ""}`}
               onClick={() => handleTabClick(1)}>
               FEATURED ACCESSORIES
            </h3>
         </div>
         <div className="search-bar-container">
            <input
               type="search"
               className="form-control rounded-end mb-4"
               placeholder="Filter"
               value={filter}
               onChange={handleFilterChange}
            />
         </div>
         {activeTab === 0 ? <AllCats filter={filter} /> : <AllAccess filter={filter} />}
      </div>
   );
};

export default Home;
