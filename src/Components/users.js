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
  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p>name: {user.username}</p>
              <button onClick={() => handleDelete(user)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
