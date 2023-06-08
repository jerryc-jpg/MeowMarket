import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"

const SingleProductAdmin = () =>{
    const {products} = useSelector(state => state);
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [oneProd,setOneProd] = useState({});
    const [name,setName] = useState('');
    const [productType,setProductType] = useState('');
    const [price,setPrice] = useState(0.0);
    const [breed,setBreed] = useState('');
    const [description,setDescription] = useState('');
    const [age,setAge] = useState(0);
    const [image,setImage] = useState('');
    const [quantity,setQuantity] = useState(0);
    const [isCat,setIsCat] = useState(false);

    React.useEffect(() => { 
        const foundProd = products.find(product => product.id === id);
        
        if (!foundProd) {
            navigate('/');
        }else{
            setOneProd(foundProd);
            setName(foundProd.name);
            setProductType(foundProd.productType);
            setPrice(foundProd.price);
            setBreed(foundProd.breed);
            setDescription(foundProd.description);
            setAge(foundProd.age);
            setQuantity(foundProd.quantity);
            //setImage(foundProd.images);
            console.log(foundProd.productType);
            if(foundProd.productType === 'cat'){
                setIsCat(true);
            }
        }
    },[products,id]);
    console.log(isCat);

    const updateProduct = async(ev)=>{
        ev.preventDefault();
        console.log("hi works")
    }

    return(
        <div>
            <form onSubmit={updateProduct} >
                <div>
                    <label htmlFor="name">Name:</label>
                    <input placeholder="name" value={name} onChange={ev => setName(ev.target.value)}/>
                </div>
                <div>
                    <label htmlFor="productType">Type:</label>
                    <input placeholder="product type" value={productType} onChange={ev => setProductType(ev.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price" >Price:</label>
                    <input placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}/>
                </div>
                <div>
                    <label htmlFor="image URL">image</label>
                    <input placeholder="image" />
                </div>
                
                {isCat?
                    <> 
                        <div>
                            <label htmlFor="breed">Breed:</label>
                            <input placeholder="breed" value={breed} onChange={ev => setBreed(ev.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="age">age</label>
                            <input placeholder="age" value={age} onChange={ev => setAge(ev.target.value)}/>
                        </div>
                            
                    </>:null}
                <div>
                    <label htmlFor="description">description:</label>
                    <input placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}/>
                </div>
                <div>
                    <label htmlFor="quantity">quantity</label>
                    <input placeholder="quantity" value={quantity} onChange={ev => setQuantity(ev.target.value)}/>
                </div>
                <button disabled={name === '' }>update</button>
            </form>
        </div>
    )
}

export default SingleProductAdmin;