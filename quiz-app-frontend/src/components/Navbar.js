import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import LoggedInUser from './LoggedInAs';

function Navbar({ user, logout }) {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const burgerClasses = classNames('navbar-burger', { 'is-active': menuExpanded });
  const menuClasses = classNames('navbar-menu', { 'is-active': menuExpanded });
  const toggleMenu = () => {
    setMenuExpanded(!menuExpanded);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">

      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h1 className="is-size-4 has-text-weight-semibold">Quiz App</h1>
        </Link>
        <a role="button" className={burgerClasses} onClick={toggleMenu} aria-label="menu" aria-expanded={menuExpanded} data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" className={menuClasses}>
        {user &&
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/quizzes">
              My Quizzes
            </Link>
            <Link className="navbar-item" to='/attempts'>
              Quiz Results
            </Link>
          </div>}

        <div className="navbar-end is-flex is-justify-content-right">
          {user && <LoggedInUser name={user.name} />}
          <div className="navbar-item">
            <div className="buttons">

              {user && <button className="button is-light" onClick={() => logout()}>Logout</button>}
              {!user && <Link className="button is-light" to='/login'>Login</Link>}

            </div>
          </div>
        </div>

      </div>

    </nav>

  );
}

export default Navbar;
