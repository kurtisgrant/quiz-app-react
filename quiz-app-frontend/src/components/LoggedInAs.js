import React from 'react';

function LoggedInAs({ name }) {
  return (
    <div className="navbar-item">
      <span className="navbar-item">
        Logged in as: {name}
      </span>
    </div>
  );
}

export default LoggedInAs;
