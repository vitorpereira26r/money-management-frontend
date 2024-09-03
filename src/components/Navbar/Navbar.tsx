import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';

export const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth.logout();
    window.location.href = window.location.href;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Money Management</a>
          <div className="d-flex flex-grow-1 justify-content-lg-start justify-content-between">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" data-cy={"home-nav-link"} href="/home">Home</a>
              </li>
              {!auth.user && <li className='nav-item'>
                <a className='nav-link' data-cy={"login-nav-link"} href="/login">Login</a>
              </li>}
              {!auth.user && <li className='nav-item'>
                <a className='nav-link' data-cy={"register-nav-link"} href="/register">Register</a>
              </li>}
              {auth.user && <li className='nav-item'>
                <a className='nav-link' data-cy={"transactions-nav-link"} href="/transactions">Transactions</a>
              </li>}
              {auth.user && <li className='nav-item'>
                <a className='nav-link' data-cy={"settings-nav-link"} href="/user-config">Setting</a>
              </li>}
              {auth.user && <li className="nav-item">
                <a className="nav-link" data-cy={"logout-nav-link"} href="/" onClick={handleLogout}>Logout</a>
              </li>}
              {auth.user && <li className="nav-item">
                <a className="nav-link" data-cy={"logout-nav-link"} href="/admin" onClick={handleLogout}>Admin</a>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
