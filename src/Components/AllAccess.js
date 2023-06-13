import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity, addToWishlist, deleteFromWishlist } from "../store";

const AllAccess = ({filter}) => {
   const dispatch = useDispatch();
   const { products, cart, wishlist } = useSelector((state) => state);
   const [allAccess,setAllAccess] = useState([]);
   const user = useSelector((state) => state.auth);

   ///pagination
   const [currentPageCats, setCurrentPageCats] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 9;

   const hanelPreviousPage = () =>{
      setCurrentPage((Page) => Page - 1);

   };
     
   const handelNextPage = () => {
      setCurrentPage((Page) => Page + 1);
   
   };
     
   const addToWishlistHandler = (product) => {
      const isProductInWishlist = wishlist.some(
        (item) => item.product.id === product.id
      );
    
      if (isProductInWishlist) {
        dispatch(deleteFromWishlist(product));
      } else { 
        dispatch(addToWishlist(product));
      }
    };


   


   React.useEffect(()=>{
      let access = products.filter((product) => product.productType !== "cat");
      let accesslist = [...access];
      if (accesslist) {
         accesslist.sort(function (a, b) {
         if (a.name < b.name) {
            return -1;
         }
         if (a.name > b.name) {
            return 1;
         }
         return 0;
         });
      }
      setAllAccess(accesslist);
   },[products]);

   const AllfilteredAccess = allAccess.filter((access) =>
      access.name.toLowerCase().includes(filter.toLowerCase())
   );
   let filteredAccess = [...AllfilteredAccess].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
   let totalPages = Math.ceil(allAccess.length/itemsPerPage);


   return (
      <div className="container text-center">
         <div className="row">
            {filteredAccess.map((access) => {
               return (
                  <div key={access.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                     <div className="card h-100">
                        <div className="ratio ratio-4x3">
                           <img src={access.images} className="card-img-top img-fluid" alt={access.name} />
                        </div>
                        <div className="card-body">
                           <h5 className="card-title">{access.name}</h5>
                           <Link to={`/${access.id}`} className="btn btn-primary me-2">
                              Details
                           </Link>
                           <button
                              onClick={() => {
                                 dispatch(updateProductQuantity({product:access,quantity:1}))
                                 dispatch(addToCart({ product: access, quantity: 1 }))
                              }}
                              className="btn btn-primary">
                                 {
                                    access.quantity>0?(<span>Add to Cart</span>):(<span>Opps! Sold</span>)
                                 }
                           </button>
                           {user.username && (
                           <button onClick={() => addToWishlistHandler(access)} className="btn btn-outline-danger ms-3">
                              <i className="far fa-heart"></i>
                           </button>
                        )}
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <>
            <button 
               onClick={hanelPreviousPage}
               disabled={currentPage<=1}
            >
               previous
            </button>
            <span>{currentPage}</span>
            <button 
               onClick={handelNextPage}
               disabled={currentPage>=totalPages}
            >
               next
            </button>
         </>
      </div>
   );
};

export default AllAccess;
