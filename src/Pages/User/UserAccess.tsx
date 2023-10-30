import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';

export const UserAccess: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h2>UserAccess</h2>
      <div>
        <p>Hello {auth.user?.username}</p>
      </div>
    </div>
  )
}
