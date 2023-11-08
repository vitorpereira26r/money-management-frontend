import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth.logout();
    window.location.href = window.location.href;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className='navbar-brand' href="/">
            <img className="rounded float-start" src="/logo/icon.jpg" width="50" height="50" alt="logo" />
          </a>
          <a className="navbar-brand" href="/">Noteworthy Finance</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/home">Home</a>
              </li>
              {!auth.user && <li className='nav-item'>
                <a className='nav-link' href="/login">Login</a>
              </li>}
              {!auth.user && <li className='nav-item'>
                <a className='nav-link' href="/register">Register</a>
              </li>}
              {auth.user && <li className='nav-item'>
                <a className='nav-link' href="/transactions">Transactions</a>
              </li>}
              {auth.user && <li className='nav-item'>
                <a className='nav-link' href="/user-config">Setting</a>
              </li>}
              {auth.user && <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
