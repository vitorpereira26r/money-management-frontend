import React, { useContext, useEffect, useState } from 'react'
import { AccountCard } from '../AccountCard/AccountCard'
import { Account } from '../../entities/Account/Account';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { accountApi } from '../../services/AccountServices';

export const Accounts: React.FC = () => {

  const auth = useContext(AuthContext);
  const api = accountApi();

  const[accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const getAccounts = async () => {
        const id = auth.user?.id;
        if(id){
            const data = await api.getAccountsByUserId(id);
            if(data){
                console.log(data);
                setAccounts(data);
            }
        }
    }
    getAccounts();
  }, []);

  const handleDelete = async (id: number) => {
    console.log("handle delete, id: " + id);
    const accountToDelete = accounts.find((acc) => acc.id === id);

    if(accountToDelete){
        const updatedAccounts: Account[] = accounts.filter((account) => account.id !== id);
        setAccounts(updatedAccounts);
    
        const response = await api.deleteAccount(id);
    
        if(response.status === 404){
            setAccounts([...updatedAccounts, accountToDelete]);
        }
    }
  }

  const handleEdit = async (account: Account) => {
    console.log("handle edit");
    console.log(account);

    
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {accounts.map((account, index) => (
            <div key={index} className="col-md-4 mb-4">
                <AccountCard account={account} onDelete={handleDelete} onEdit={handleEdit}/>
            </div>
            ))}
      </div>
    </div>
  )
}
