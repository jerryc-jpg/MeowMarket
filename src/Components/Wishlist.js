import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWishlist } from "../store/wishlist";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist ? wishlist.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
        </div>
      )) : <h1>Wishlist is empty</h1>}
    </div>
  );
};

export default Wishlist;
