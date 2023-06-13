import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity, addToWishlist } from "../store";

const AllCats = ({ filter }) => {
   const dispatch = useDispatch();
   const { products, cart } = useSelector((state) => state);
   const [allCats, setAllCats] = useState([]);

   //new////
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 9;

   const handlePreviousPage = () => {
      setCurrentPage((Page) => Page - 1);
   };
   const handleNextPage = () => {
      setCurrentPage((Page) => Page + 1);
   };
   ///////

   // didn't use this sortProduct
   // const sortProduct = (list) => {
   //   if (list) {
   //     list.sort(function (a, b) {
   //       if (a.quantity > b.quantity) {
   //         return -1;
   //       }
   //       if (a.quantity < b.quantity) {
   //         return 1;
   //       }
   //       return 0;
   //     });
   //   }
   // };

   const addToWishlistHandler = (product) => {
      dispatch(addToWishlist(product));
      console.log("add to wishlist");
   };

   React.useEffect(() => {
      let cats = products.filter((product) => product.productType === "cat");

      let catlist = [...cats];
      if (catlist) {
         catlist.sort(function (a, b) {
            if (a.quantity > b.quantity) {
               return -1;
            }
            if (a.quantity < b.quantity) {
               return 1;
            }
            return 0;
         });
      }
      setAllCats(catlist);
   }, [products, cart]);

   const AllfilteredCats = allCats.filter((cat) => cat.name.toLowerCase().includes(filter.toLowerCase()));

   const indexOfLastCat = currentPage + itemsPerPage;
   const indexOfFirstCat = indexOfLastCat - itemsPerPage;
   const currentCats = AllfilteredCats.slice(indexOfFirstCat, indexOfLastCat);

   const totalPages = Math.ceil(AllfilteredCats.length / itemsPerPage);

   return (
      <div className="container text-center">
         <div className="row">
            {currentCats.map((cat) => (
               <div key={cat.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100">
                     <div className="ratio ratio-4x3">
                        <img className="card-img-top img-fluid" src={cat.images[0]} alt={cat.name} />
                     </div>
                     <div className="card-body">
                        <h5 className="card-title">{cat.name}</h5>
                        <Link to={`/${cat.id}`} className="btn btn-primary me-2">
                           Details
                        </Link>
                        <button
                           onClick={() => {
                              dispatch(updateProductQuantity({ product: cat, quantity: 1 }));
                              dispatch(addToCart({ product: cat, quantity: 1 }));
                           }}
                           disabled={cat.quantity === 0}
                           className="btn btn-primary">
                           {cat.quantity > 0 ? <span>TAKE ME HOME</span> : <span>TAKEN</span>}
                        </button>
                        <button onClick={() => addToWishlistHandler(cat)} className="btn btn-outline-danger ms-5">
                           <i className="far fa-heart"></i>
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <nav className="Page navigation mb-5 d-flex justify-content-center align-items-center">
            <ul className="pagination my-4" style={{ gap: "10px" }}>
               <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handlePreviousPage}>
                     Previous
                  </button>
               </li>
               {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
                     <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                     </button>
                  </li>
               ))}
               <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handleNextPage}>
                     Next
                  </button>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default AllCats;
