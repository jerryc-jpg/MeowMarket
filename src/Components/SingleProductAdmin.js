import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editProduct, createProduct } from "../store";

const SingleProductAdmin = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [oneProd, setOneProd] = useState({});
  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState(0.0);
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isCat, setIsCat] = useState(false);

  React.useEffect(() => {
    const foundProd = products.find((product) => product.id === id);

    if (!foundProd) {
      navigate("/");
    } else {
      setOneProd(foundProd);
      setName(foundProd.name);
      setProductType(foundProd.productType);
      setPrice(foundProd.price);
      setBreed(foundProd.breed);
      setDescription(foundProd.description);
      setAge(foundProd.age);
      setQuantity(foundProd.quantity);
      setImage(foundProd.images);
      if (foundProd.productType === "cat") {
        setIsCat(true);
      }
    }
  }, [products, id]);

  const updateProduct = async (ev) => {
    ev.preventDefault();
    const updatedProduct = {
        id: oneProd.id,
        name,
        productType,
        price,
        breed,
        description,
        age,
        quantity,
        images: image,
  };
    await dispatch(editProduct(updatedProduct));
    navigate(`/${id}`);
    };

    return (
      <div className="m-3">
        <form onSubmit={updateProduct}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productType" className="form-label">Type:</label>
            <input
              type="text"
              className="form-control"
              placeholder="product type"
              value={productType}
              onChange={(ev) => setProductType(ev.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Image URL"
            value={image}
            onChange={(ev) => setImage(ev.target.value)}
          />
        </div>
          {isCat ? (
            <>
              <div className="mb-3">
                <label htmlFor="breed" className="form-label">Breed:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="breed"
                  value={breed}
                  onChange={(ev) => setBreed(ev.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="age"
                  value={age}
                  onChange={(ev) => setAge(ev.target.value)}
                />
              </div>
            </>
          ) : null}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              className="form-control"
              placeholder="description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              style={{ whiteSpace: "pre-wrap" }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="number"
              className="form-control"
              placeholder="quantity"
              value={quantity}
              onChange={(ev) => setQuantity(ev.target.value)}
            />
          </div>
          <button className="btn btn-primary" disabled={name === ""}>Update</button>
        </form>
      </div>
    );
  };
  
  export default SingleProductAdmin;
  
  
  
  
  