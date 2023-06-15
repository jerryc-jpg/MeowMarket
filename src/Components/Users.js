import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../store";

const Users = () => {
   const { users } = useSelector((state) => state);
   const dispatch = useDispatch();

   React.useEffect(() => {
      dispatch(fetchUsers());
   }, [dispatch]);

   const handleDelete = (user) => {
      dispatch(deleteUser(user));
   };
   return (
      <div className="container px-3 my-5 clearfix">
         <div className="card">
            <div className="card-header">
               <h1 className="mt-4 text-center">Users</h1>
            </div>
            <div className="row">
               {users
                  .filter((user) => !user.isAdmin)
                  .map((user) => (
                     <div
                        className="col-lg-4 col-md-6 col-sm-12 mt-4 mb-4  d-flex justify-content-center align-items-center"
                        key={user.id}>
                        <div className="card card-small">
                           <div className="card-body">
                              <h5 className="card-title">Name: {user.username}</h5>
                              <p className="card-text">Email: {user.email}</p>
                              <button className="btn btn-danger" onClick={() => handleDelete(user)}>
                                 Delete
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
};

export default Users;
