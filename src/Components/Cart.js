import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, checkoutCart, updateProductQuantity } from "../store";

const Cart = () => {
   //test window.localStorage whether behave correctly, (stored item able to be retrieval between pages)
   /*
   console.log('try to find visitor order and token')
   const visitorOrderString=window.localStorage.getItem('visitorOrder');
   const token=window.localStorage.getItem('toekn');
   if(visitorOrderString){
      console.log('line12 visitor order:',JSON.parse(visitorOrderString));
   }
   if(token){
      console.log('line15 token:',token)
   }
   console.log('line17,already check token and visitor order');}
   */
   const token = window.localStorage.getItem('token');
   const visitorOrder= JSON.parse(window.localStorage.getItem('visitorOrder'));
   const navigate= useNavigate();

   const { cart } = useSelector((state) => state);
   const dispatch = useDispatch();
   const [items, setItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQ, setTotalQ] = useState(0);



   const handleClearLocalStorage = () => {
      window.localStorage.clear(); 
      navigate("/cart")// Remove all items from window.localStorage
      console.log('empty');
   };

   

   React.useEffect(() => {
      let list;
      if(token){
         list = [...cart.lineItems];}
      else{
         if(visitorOrder){
            const listTemp = [...visitorOrder];
            list = listTemp.filter(ele=>ele.quantity!==0);
            list = visitorOrder;
         }else{
            list = [];
         }
         
      }
      if (list) {
         list.sort(function (a, b) {
            if (a.product.name < b.product.name) {
               return -1;
            }
            if (a.product.name > b.product.name) {
               return 1;
            }
            return 0;
         });
      }
      // let list = [...cart.lineItems];
      // if (list) {
      //    list.sort(function (a, b) {
      //       if (a.product.name < b.product.name) {
      //          return -1;
      //       }
      //       if (a.product.name > b.product.name) {
      //          return 1;
      //       }
      //       return 0;
      //    });
      // }

      const sumPrice = list.reduce((acc, curr) => {
         acc = acc + curr.product.price * curr.quantity;
         return acc;
      }, 0);
      const sumQ = list.reduce((acc, curr) => {
         acc = acc + curr.quantity;
         return acc;
      }, 0);
      //console.log('visitorOrder:',visitorOrder)
      //console.log('did we update list:',list);
      setItems(list);
      setTotalPrice(sumPrice);
      setTotalQ(sumQ);
   }, [cart]);
   
   console.log('token',token);
   console.log('items',items);

   return (
      <div className="container px-3 my-5 clearfix">
         <div className="card custom-card">
            <div className="card-header">
               <h2>Shopping Cart</h2>
               {
                  !token?
                  <button onClick={handleClearLocalStorage}>internal test,empty visitor history</button>:null
               }
               
            </div>
            <div className="card-body">
               <div className="table-responsive">
                  <table className="table table-bordered m-0">
                     <thead>
                        <tr>
                           <th className="text-center py-3 px-4" style={{ minWidth: "400px" }}>
                              Product Name &amp; Details
                           </th>
                           <th className="text-right py-3 px-4" style={{ width: "100px" }}>
                              Price
                           </th>
                           <th className="text-center py-3 px-4" style={{ width: "100px" }}>
                              Quantity
                           </th>
                           <th className="text-right py-3 px-4" style={{ width: "100px" }}>
                              Total
                           </th>
                           <th className="text-center align-middle py-3 px-0" style={{ width: "100px" }}>
                              <a
                                 href="#"
                                 className="shop-tooltip float-none text-light"
                                 title=""
                                 data-original-title="Clear cart">
                                 <i className="ino ion-md-trash" style={{ fontSize: "36px" }}></i>
                              </a>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {items.map((item) => (
                           <tr key={item.id}>
                              <td className="p-6 align-items-center">
                                 <div className="media align-items-center">
                                    <img
                                       src={item.product.images[0]}
                                       className="d-block ui-w-40 ui-bordered mr-4"
                                       alt={item.product.name}
                                    />
                                    <div className="media-body">
                                       <Link to={`/${item.product.id}`} href="#" className="d-block text-dark">
                                          {item.product.name}
                                       </Link>
                                       {item.product.productType === "cat" ? (
                                          <small>
                                             <span className="text-muted">Breed: {item.product.breed}</span>
                                             <span className="text-muted"></span> &nbsp;
                                             <span className="text-muted">Age: </span> {item.product.age}
                                          </small>
                                       ) : null}
                                    </div>
                                 </div>
                              </td>
                              <td className="text-right font-weight-semibold align-middle p-4">
                                 ${item.product.price}
                              </td>
                              <td className="align-items-middle p-5 d-flex justify-content-between">
                                 {item.product.productType === "cat" ? (
                                    <div className="text-center" style={{ width: "100%" }}>
                                       <span className="d-block mx-auto" style={{ width: "30px" }}>
                                          {item.quantity}
                                       </span>
                                    </div>
                                 ) : (
                                    <>
                                       <button
                                          className="btn btn-sm btn-outline-dark me-1"
                                          onClick={() => {
                                             if (item.quantity > 1) {
                                                dispatch(updateProductQuantity({ product: item.product, quantity: -1 }));
                                                dispatch(removeFromCart({ product: item.product, quantityToRemove: 1 }));
                                             }
                                          }}>
                                          -
                                       </button>
                                       <input
                                          type="text"
                                          min="1"
                                          max="5"
                                          className="form-control text-center me-1"
                                          style={{ width: "60px" }}
                                          value={item.quantity}
                                          onChange={(e) => {
                                             const newQuantity = parseInt(e.target.value);
                                             dispatch(
                                                updateProductQuantity({ product: item.product, quantity: newQuantity })
                                             );
                                          }}
                                       />
                                       <button
                                          className="btn btn-sm btn-outline-dark me-1"
                                          onClick={() => {
                                             dispatch(updateProductQuantity({ product: item.product, quantity: 1 }));
                                             dispatch(addToCart({ product: item.product, quantity: 1 }));
                                             console.log('item.product.quantity:', item.product.quantity)
                                          }}
                                          disabled={item.product.quantity<=0}
                                          >
                                          +
                                       </button>
                                    </>
                                 )}
                              </td>
                              <td className="text-right font-weight-semibold align-middle p-4">
                                 ${item.product.price * item.quantity}
                              </td>
                              <td className="text-center align-middle px-0">
                                 <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                       dispatch(
                                          updateProductQuantity({ product: item.product, quantity: item.quantity * -1 })
                                       );
                                       dispatch(
                                          removeFromCart({ product: item.product, quantityToRemove: item.quantity })
                                       );
                                    }}>
                                    X
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="d-flex justify-content-end align-items-center">
                  <div className="text-right">
                     <label className="text-muted font-weight-normal m-0">Total price</label>
                     <div className="text-large">
                        <strong>${totalPrice.toFixed(2)}</strong>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3">
                     <Link to="/" className="text-decoration-none text-muted">
                        Back to shopping
                     </Link>
                  </button>
                  <Link to={{ pathname: "/cart/payment", state: { totalPrice: totalPrice } }} className="btn btn-lg btn-primary mt-2">
                     Checkout
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;
