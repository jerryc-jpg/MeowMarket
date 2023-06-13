import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWishlist, addToCart, deleteFromWishlist } from "../store";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchWishlist(id));
  }, [dispatch, id]);

  const deleteFromWishlistHandler = (product) => {
    dispatch(deleteFromWishlist(product));
  };

  return (
    <div className="container">
      <h1 className="mb-4 mt-4">Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div key={item.id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                {item.product && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.product && item.product.name}</h5>
                  <button
                    onClick={() => deleteFromWishlistHandler(item.product)}
                    className="btn btn-danger"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center">Wishlist is empty</h1>
      )}
    </div>
  );
};

export default Wishlist;
