import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity, addToWishlist, deleteFromWishlist } from "../store";

const AllCats = ({ filter }) => {
  const dispatch = useDispatch();
  const { products, cart, wishlist } = useSelector((state) => state);
  const [allCats, setAllCats] = useState([]);

  //new////
  const [currentPageCats, setCurrentPageCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const hanelPreviousPage = () =>{
   setCurrentPage((Page) => Page - 1);
  //  handelUpdatePageList(allCats,currentPage);
  };
  const handelNextPage = () => {
   setCurrentPage((Page) => Page + 1);
  //  handelUpdatePageList(allCats,currentPage);
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
    //new///
    //
    //console.log(cats,'cats');
    let catlist = [...cats];
    if (catlist) {
      //console.log('works');
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





  //console.log('allCats:',allCats);
  const AllfilteredCats = allCats.filter((cat) =>
    cat.name.toLowerCase().includes(filter.toLowerCase())
  );
  let filteredCats = [...AllfilteredCats].slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);
  let totalPages = Math.ceil(allCats.length/itemsPerPage);


  const addToWishlistHandler = (product) => {
   const isCatInWishlist = wishlist.some((item) => item.product.id === product.id);
 
   if (isCatInWishlist) {
     // Cat is already in the wishlist, remove it
     dispatch(deleteFromWishlist(product));
   } else {
     // Cat is not in the wishlist, add it
     dispatch(addToWishlist(product));
   }
 };

  
  
 
  //new
  console.log("AllCats.js totalPages:",totalPages);
  console.log("AllCats.js allCats:", allCats)
  console.log("AllCats.js current page cats:",currentPageCats);
  


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
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{cat.name}</h5>
                <Link to={`/${cat.id}`} className="btn btn-primary me-2">
                  Details
                </Link>
                <button
                  onClick={() => {
                    dispatch(
                      updateProductQuantity({ product: cat, quantity: 1 })
                    );
                    dispatch(addToCart({ product: cat, quantity: 1 }));
                  }}
                  disabled={cat.quantity === 0}
                  className="btn btn-primary"
                >
                  {cat.quantity > 0 ? (
                    <span>TAKE ME HOME</span>
                  ) : (
                    <span>TAKEN</span>
                  )}
                </button>
                <button
                  onClick={() => addToWishlistHandler(cat)}
                  className="btn btn-outline-danger"
                >
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
     
    </div>
  );
};

export default AllCats;
