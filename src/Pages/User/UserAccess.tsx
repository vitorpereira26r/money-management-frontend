import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Navbar } from '../../components/Navbar/Navbar';

export const UserAccess: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Navbar/>
      <div>
        <h2>UserAccess</h2>
        <div>
          <p>Hello {auth.user?.username}</p>
        </div>
      </div>
    </>
  )
}
