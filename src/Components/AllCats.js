import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity, addToWishlist, deleteFromWishlist, fetchWishlist } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const AllCats = ({ filter }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { products, cart, wishlist } = useSelector((state) => state);
   const [allCats, setAllCats] = useState([]);
   const user = useSelector((state) => state.auth);

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 9;

   const handlePreviousPage = () => {
      setCurrentPage((Page) => Page - 1);
   };

   const handleNextPage = () => {
      setCurrentPage((Page) => Page + 1);
   };

   const changeColor = (catId) => {
      return wishlist.some((item) => item.productId === catId);
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

   const filteredCats = [...AllfilteredCats].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   const totalPages = Math.ceil(allCats.length / itemsPerPage);

   const addToWishlistHandler = (cat) => {
      const isCatInWishlist = wishlist.some((item) => item.productId === cat.id);

      if (isCatInWishlist) {
         // Cat is already in the wishlist, remove it
         dispatch(deleteFromWishlist(cat));
      } else {
         // Cat is not in the wishlist, add it
         dispatch(addToWishlist(cat));
      }
   };

   const isProductInWishlist = (productId) => {
      return wishlist.some((item) => item.productId === productId);
   };

   const handleAddToCart = (cat) => {
      dispatch(updateProductQuantity({ product: cat, quantity: 1 }));
      dispatch(addToCart({ product: cat, quantity: 1 }));

      toast.success(`${cat.name} added to cart!`);
   };

   const handleGoToSingleItem = (ev, id) => {
      const isButton = ev.target.closest(".btn-primary");
      const isHeartIcon = ev.target.closest(".btn-outline-danger.ms-3");

      if (!isButton && !isHeartIcon) {
         navigate(`/${id}`);
      }
   };

   //console.log(wishlist);

   return (
      <div className="container text-center">
         <div className="row">
            {filteredCats.map((cat) => (
               <div key={cat.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100">
                     <div className="ratio ratio-4x3">
                        <img
                           className="card-img-top img-fluid"
                           src={cat.images[0]}
                           alt={cat.name}
                           onClick={(ev) => handleGoToSingleItem(ev, cat.id)}
                           style={{ cursor: "pointer" }}
                        />
                     </div>
                     <div className="card-body">
                        <h5 className="card-title fw-bold">{cat.name}</h5>
                        {user.username && (
                           <div className="mb-2">
                              {isProductInWishlist(cat.id) ? (
                                 <AiFillHeart className="heart active" onClick={() => addToWishlistHandler(cat)} />
                              ) : (
                                 <AiOutlineHeart className="heart" onClick={() => addToWishlistHandler(cat)} />
                              )}
                           </div>
                        )}
                        <Link to={`/${cat.id}`} className="btn btn-outline-dark me-2">
                           Details
                        </Link>
                        <button
                           onClick={() => {
                              handleAddToCart(cat);
                           }}
                           disabled={cat.quantity === 0}
                           className="btn btn-outline-dark my-2">
                           {cat.quantity > 0 ? <span>Take Me Home</span> : <span>Taken</span>}
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
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
         />
      </div>
   );
};

export default AllCats;
