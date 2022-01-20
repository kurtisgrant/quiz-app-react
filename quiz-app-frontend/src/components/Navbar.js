import React from 'react';
import { Link } from 'react-router-dom';
import LoggedInUser from './LoggedInAs';

function Navbar({ user }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">

      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="is-size-4 has-text-weight-semibold">Quiz App</h1>
        </a>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" className="navbar-menu">

        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <a className="navbar-item" href="/quizzes">
            My Quizzes
          </a>
          <a className="navbar-item" href='/attempts'>
            Quiz Results
          </a>
        </div>

        <div className="navbar-end is-flex is-justify-content-right">
          {user && <LoggedInUser name={user.name} />}
          <div className="navbar-item">
            <div className="buttons">
              <form action="/logout" method="post">
                <a className="button is-light" href='/logout'>
                  Logout
                </a>
              </form>
            </div>
          </div>
        </div>

      </div>

    </nav>

  );
}

export default Navbar;
