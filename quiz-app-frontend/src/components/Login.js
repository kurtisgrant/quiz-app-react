import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ authenticate }) {
  const [userIdInput, setUserIdInput] = useState('');

  return <div>
    <h1 className="is-size-2 has-text-white has-text-weight-bold m-3 my-5">Login</h1>
    <input
      className="input m-3"
      placeholder="Enter user ID"
      value={userIdInput}
      onChange={(e) => setUserIdInput(e.target.value)}
    />
    <button
      className="button m-3"
      onClick={() => authenticate(userIdInput)}
    >Login</button>
  </div>;
}

export default Login;
