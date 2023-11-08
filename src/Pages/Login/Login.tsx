import React, { ChangeEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const[showAlert, setShowAlert] = useState<boolean>(false);
  const[inputNotFilled, setInputNotFilled] = useState<boolean>(false);

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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
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
  )
}
