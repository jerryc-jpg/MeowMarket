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
    <div className="container">
      <h1 className="mt-4">Users</h1>
      <div className="row">
        {users.filter(user => !user.isAdmin).map((user) => (
          <div className="col-lg-4 mt-4" key={user.id}>
            <div className="card">
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
  );
};

export default Users;
