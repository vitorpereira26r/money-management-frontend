import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LadingPage.css'
import { Navbar } from '../../components/Navbar/Navbar';
import { AuthContext } from '../../contexts/Auth/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
        setIsLoading(false);
    }, 700);

    return () => clearTimeout(delay);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleRegisterClick = () => {
    navigate("/register");
  }

  if(auth.user !== null){
    console.log("auth.user=true")
    setIsLoading(true);
    navigate("/home");
  }

  if (isLoading) {
    return (
        <div
            className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
  }


  return (
    <>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minWidth: '100%' }}>
        <button
          type="button"
          onClick={handleLoginClick}
          className="btn btn-secondary d-block mb-3 custom-btn"
          data-cy={"login-btn"}
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleRegisterClick}
          className="btn btn-secondary d-block custom-btn"
          data-cy={"register-btn"}
        >
          Register
        </button>
      </div>
    </div>
    </>
  )
}
