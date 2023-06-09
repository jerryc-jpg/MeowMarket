import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity } from "../store";

const AllCats = () => {
   const dispatch = useDispatch();
   const { products, cart } = useSelector((state) => state);

   const [allCats,setAllCats] = useState([]);
   
   console.log(cart.lineItems,"allcats line11");


   React.useEffect(()=>{
      let Cats = products.filter((product) => product.productType === "cat" && product.quantity > 0);
      setAllCats(Cats);
   },[products,cart])


   return (
      <div className="container text-center">
         <div className="row">
            {allCats.map((cat) => (
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
                           onClick={() =>{
                                 dispatch(updateProductQuantity({product:cat,quantity:1}))
                                 dispatch(addToCart({ product: cat, quantity: 1 }))
                              }
                           }
                           className="btn btn-primary">
                           TAKE ME HOME
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AllCats;
