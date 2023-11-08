import React, { ChangeEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRegistration } from '../../entities/User/User';

export const Register: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");

  const[usernameLengthOk, setUsernameLengthOk] = useState<boolean>(true);
  const[passwordLengthOk, setPasswordLengthOk] = useState<boolean>(true);

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameLengthOk(true);
  }

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordLengthOk(true);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(username.length < 2 || username.length > 40){
      setUsernameLengthOk(false);
    }
    else if(password.length < 8 || password.length > 40){
      setPasswordLengthOk(false);
    }
    else{
      if(username && password && username != "" && password != ""){
        const user: UserRegistration = {
            username: username,
            password: password
          }
          
          console.log(user);
          
          const isRegistered = await auth.register(user);
          if(isRegistered){
            navigate("/login");
          }
      }
    }
  }

  return (
    <div className="container">
      <h2 className='mt-2'>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${!usernameLengthOk ? "is-invalid" : ""} mb-2`}
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameInput}
            required
          />
          {!usernameLengthOk && (
            <div className="alert alert-danger" role="alert">
              Username must have between 2 and 40 characters.
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${!passwordLengthOk ? "is-invalid" : ""} mb-2`}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          {!passwordLengthOk && (
            <div className="alert alert-danger" role="alert">
              Password must have between 8 and 40 characters.
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  )
}
