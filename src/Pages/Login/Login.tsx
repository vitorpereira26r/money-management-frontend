import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';

export const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const[showAlert, setShowAlert] = useState<boolean>(false);
  const[inputNotFilled, setInputNotFilled] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
        setIsLoading(false);
    }, 700);

    return () => clearTimeout(delay);
  }, []);

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

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(username === "" || password === ""){
      setInputNotFilled(true);
      return;
    }
    if(username && password && username != "" && password != ""){
      const isLogged = await auth.login(username, password);
      if(isLogged){
        navigate("/home");
      }
      else{
        setShowAlert(true);
      }
    }
    else{
      setInputNotFilled(true);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <h2 className='mt-2'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameInput}
            data-cy={"login-username-input"}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
            data-cy={"login-password-input"}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          data-cy={"submit-login-btn"}
        >
          Login
        </button>
      </form>
      {showAlert && 
      <div className="alert alert-danger mt-3" role="alert">
          Username or Password is incorrect
      </div>}
      {inputNotFilled && 
      <div className="alert alert-danger mt-3" role="alert">
          Fill the inputs
      </div>}
    </div>
    </>
  )
}
