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
    <div>
      <h1>Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div key={item.id}>
            <h3>{item.product && item.product.name}</h3>
            {item.product && (
              <img src={item.product.images[0]} alt={item.product.name} />
            )}
            <button onClick={() => deleteFromWishlistHandler(item.product)}>
              Remove from Wishlist
            </button>
          </div>
        ))
      ) : (
        <h1>Wishlist is empty</h1>
      )}
    </div>
  );
};

export default Wishlist;
