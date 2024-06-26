import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';

export const Login: React.FC = () => {
  const location = useLocation();
  const usernameCreated = location.state?.username || '';

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const[showAlert, setShowAlert] = useState<boolean>(false);
  const[inputNotFilled, setInputNotFilled] = useState<boolean>(false);

  const[showPassword, setShowPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(usernameCreated !== ""){
      setUsername(usernameCreated);
    }

    const delay = setTimeout(() => {
        setIsLoading(false);
    }, 700);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if(auth.user !== null){
      setIsLoading(true);
      navigate("/home");
    }
  }, [auth.user, navigate])


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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      {usernameCreated && (
        <div className="alert alert-success mt-3" role="alert">
          Your account has been created with the username: <strong>{usernameCreated}</strong>
        </div>
      )}
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
          <div className='input-group'>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordInput}
              data-cy={"login-password-input"}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
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
