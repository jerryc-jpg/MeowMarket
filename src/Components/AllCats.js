import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, updateProductQuantity, addToWishlist } from "../store";

const AllCats = ({ filter }) => {
  const dispatch = useDispatch();
  const { products, cart } = useSelector((state) => state);
  const [allCats, setAllCats] = useState([]);
  //new 
  // const [currentPageCats, setCurrentPageCats] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6;
  // const totalPages = Math.ceil(products.length/itemsPerPage);
  // const hanelPreviousPage = () =>{
  //  setCurrentPage((Page) => Page - 1);
  // };
  // const handelNextPage = () => {
  //  setCurrentPage((Page) => Page + 1);
  // };
  // const updatePage = (list) =>{
  //  const startIndex = (currentPage -1) * itemsPerPage;
  //  const endIndex = startIndex + itemsPerPage;
  //  setCurrentPage( products.slice(0,6));
  // }
  //new


  const sortProduct = (list) => {
    if (list) {
      list.sort(function (a, b) {
        if (a.quantity > b.quantity) {
          return -1;
        }
        if (a.quantity < b.quantity) {
          return 1;
        }
        return 0;
      });
    }
  };
  

  

  React.useEffect(() => {
    let cats = products.filter((product) => product.productType === "cat");
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


  console.log('allCats:',allCats);
  const filteredCats = allCats.filter((cat) =>
    cat.name.toLowerCase().includes(filter.toLowerCase())
  );

  // //new
  // console.log('filteredCats:', filteredCats);
  // let currentCats = updatePage(filteredCats);
  // //new

  const addToWishlistHandler = (product) => {
    dispatch(addToWishlist(product));
    console.log("add to wishlist");
  };

  return (
        //  <div>
        //     {currentCats.map((cat) =>{
        //       <div key={cat.id}>{cat.name}</div>

        //     })
        //       }
        //  </div>
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
    </div>
  );
};

export default AllCats;
