import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store";

const SingleProduct = () => {
<<<<<<< Updated upstream
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState(1);

    const decrementQ = () => {
        if(quantity>1){
            setQuantity(quantity - 1);
        }
=======
  const { products, auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [oneProd, setOneProd] = useState({});
  const isAdmin = auth.isAdmin;

  const isActiveAdd = (inputId) =>{
    const activeAdd = cart.lineItems.reduce((acc,curr) =>{return acc && curr.productId!== inputId }, true)
    return activeAdd;
 }
  React.useEffect(() => {
    const foundProd = products.find((product) => product.id === id);
    if (!foundProd) {
      navigate("/");
    } else {
      setOneProd(foundProd);
>>>>>>> Stashed changes
    }

    const incrementQ = () => {
        if(quantity<5){
            setQuantity(quantity + 1);  
        }
        
    }

    const {id} = useParams();
    const oneProd = products.find(product => product.id === id);
    if (!oneProd) {
        return null;
    }
<<<<<<< Updated upstream
    return(
    <>
=======
  };

  const handleQuantityChange = (ev) => {
    const value = Number(ev.target.value);
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };

  const handleDelete = () => {
    dispatch(deleteProduct(oneProd));
    navigate("/");
    };


  if (oneProd.productType === "cat") {
    return (
      <>
        <p>Cat</p>
        <p>Name:{oneProd.name}</p>
        <p>Breed:{oneProd.breed}</p>
        <p>Age:{oneProd.age}</p>
        <p>Description:{oneProd.description}</p>
        <p>Price:{oneProd.price}</p>
        <img src={oneProd.images[0]} />
        {isAdmin ? (
          <>
            {" "}
            <Link to={`/admin/${oneProd.id}`}>
              <button>Edit</button>
            </Link>
            <button
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={() => {if(isActiveAdd(id)){
                dispatch(addToCart({ product: oneProd, quantity }))
            }else{
                window.alert("Maximum quantity reached!");
                console.log("Maximum quantity reached!");
            }
              ;
            }}
          >
            TAKE ME HOME
          </button>
        )}
      </>
    );
  } else {
    return (
      <>
        <h1>accessory</h1>
>>>>>>> Stashed changes
        <h1>{oneProd.name}</h1>
        <button onClick={decrementQ}>-</button>
        <input type="number" defaultValue={quantity} min="1" max="5"/>
        <button onClick={incrementQ}>+</button>
        <button onClick={() => {console.log(1); dispatch(addToCart({product:oneProd,quantity}))}}>Add Cart</button>
    </>
    )
}

export default SingleProduct;