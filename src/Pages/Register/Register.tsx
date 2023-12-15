import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRegistration } from '../../entities/User/User';
import { Navbar } from '../../components/Navbar/Navbar';

export const Register: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");

  const[usernameLengthOk, setUsernameLengthOk] = useState<boolean>(true);
  const[passwordLengthOk, setPasswordLengthOk] = useState<boolean>(true);

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
    <>
    <Navbar/>
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
            data-cy={"register-username-input"}
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
            data-cy={"register-password-input"}
            required
          />
          {!passwordLengthOk && (
            <div className="alert alert-danger" role="alert">
              Password must have between 8 and 40 characters.
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" data-cy={"submit-register-btn"}>
          Register
        </button>
      </form>
    </div>
    </>
  )
}
