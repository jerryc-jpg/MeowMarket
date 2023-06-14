import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWishlist, addToCart, deleteFromWishlist } from "../store";
import { Link } from "react-router-dom";

const Wishlist = () => {
   const { wishlist } = useSelector((state) => state);
   const dispatch = useDispatch();
   const { id } = useParams();

   React.useEffect(() => {
      dispatch(fetchWishlist(id));
   }, [dispatch, id]);

   const deleteFromWishlistHandler = (product) => {
      dispatch(deleteFromWishlist(product));
   };

  

   return (
      <div className="container px-3 my-5 clearfix">
         <div className="card custom-card">
            <div className="card-header">
               <h2 className="text-center">Wishlist</h2>
            </div>

            {wishlist.length ? (
               wishlist.map((item) => (
                  <div key={item.id} className="card-body mb-3">
                     <div className="row g-0">
                        <div className="col-md-4">
                           {item.product && (
                              <img src={item.product.images[0]} alt={item.product.name} className="img-fluid" />
                           )}
                        </div>
                        <div className="col-md-8">
                           <div className="card-body">
                              <h3 className="card-title">
                                 <Link
                                    to={`/${item.productId}`}
                                    href="#"
                                    className="d-block text-dark text-underline-hover">
                                    {item.product && item.product.name}
                                 </Link>
                              </h3>

                              <button
                                 onClick={() => deleteFromWishlistHandler(item.product)}
                                 className="btn btn-danger">
                                 Remove from Wishlist
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <h2 className="text-center mt-3 mb-3">Wishlist is empty</h2>
            )}
         </div>
      </div>
   );
};

export default Wishlist;
