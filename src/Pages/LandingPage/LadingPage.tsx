import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LadingPage.css'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleRegisterClick = () => {
    navigate("/register");
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minWidth: '100%' }}>
        <h2>Welcome to the Noteworthy Finance</h2>
        <button type="button" onClick={handleLoginClick} className="btn btn-secondary d-block mb-3 custom-btn">Login</button>
        <button type="button" onClick={handleRegisterClick} className="btn btn-secondary d-block custom-btn">Register</button>
      </div>
    </div>
  )
}
