import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { Accounts } from '../../components/Accounts/Accounts';
import { UserTransactions } from '../../components/UserTransactions/UserTransactions';

export const Home: React.FC = () => {

  const auth = useContext(AuthContext);
  
  const[formattedBalance, setFormattedBalance] = useState("");
  const[balanceColorClass, setBalanceColorClass] = useState("");

  useEffect(() => {
      if(auth.user && auth.user.balance !== undefined){
          setFormattedBalance(auth.user?.balance.toFixed(2)); 
        
          setBalanceColorClass(auth.user?.balance < 0 ? 'text-danger' : 'text-success');
      }
  }, []);



  return (
    <div className="container mt-4">
      <h2 className="text-primary">Hello, {auth.user?.username}</h2>
      <p className="text-muted">Overall Balance</p>
      <p className={`font-weight-bold ${balanceColorClass}`}>$ {formattedBalance}</p>
      <Accounts />
      <UserTransactions/>
    </div>
  )
}
