import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ajax from 'can-ajax';

const getUserByID = (id, cb) => {
  ajax({
    url: `http://localhost:8080/users/${id}`,
    success: function(user) {
      console.log('/users/:id request succeeded', user);
      cb(user);
    },
    error: function(request, status, error) {
      console.error('ajax in Login', status, error, request.responseText);
    }
  });
};

function Login({ setLoggedInUser }) {
  const { id } = useParams();
  useEffect(() => {
    getUserByID(id, setLoggedInUser);
  }, []);
  return <div>Login: {id}</div>;
}

export default Login;
