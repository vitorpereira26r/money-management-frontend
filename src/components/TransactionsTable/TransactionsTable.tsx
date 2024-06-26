import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { transactionApi } from '../../services/TransactionsServices';
import { Transaction } from '../../entities/Transaction/Transaction';
import { Account } from '../../entities/Account/Account';
import { accountApi } from '../../services/AccountServices';

export const TransactionsTable: React.FC = () => {
  const auth = useContext(AuthContext);
  const api = transactionApi();
  const accApi = accountApi();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await api.getTransactions();
      if (data) {
        setTransactions(data);
      }
    };

    const getAccounts = async () => {
      const data = await accApi.getAccounts();
      if (data) {
        setAccounts(data);
      }
    };

    getAccounts();
    getTransactions();
  }, []);


  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedAccount && transaction.account.name !== selectedAccount) {
      return false;
    }
    if (selectedType && transaction.type !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mt-4">
      <h2>{auth.user?.username}'s transactions</h2>
      <button className='btn btn-outline-secondary mb-1'>
        <a href="/transactions" className='nav-link'>Create, Edit and Delete Transactions</a>
      </button>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label className="form-label">Filter By Account:</label>
            <select
              className="form-control"
              onChange={(e) => setSelectedAccount(e.target.value)}
              value={selectedAccount || ''}
            >
              <option value="">All</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.name}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label className="form-label">Filter By Type:</label>
            <select
              className="form-control"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType || ''}
              data-cy={"type-filter-select-btn"}
            >
              <option value="">All</option>
              <option value="EXPENSE" data-cy={"type-filter-option-expense-btn"}>Expense</option>
              <option value="INCOME" data-cy={"type-filter-option-income-btn"}>Income</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table table-hover border rounded p-3 mb-3">
        <thead>
          <tr>
            <th scope="col" key="type">
              Type
            </th>
            <th scope="col" key="amount">
              Amount
            </th>
            <th scope="col" key="account">
              Account
            </th>
            <th scope="col" key="category">
              Category
            </th>
            <th scope="col" key="date">
              Date
            </th>
            <th scope="col" key="description">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td
                className={
                  transaction.type === 'EXPENSE' ? 'text-danger' : 'text-success'
                }
              >
                {transaction.type}
              </td>
              <td
                className={`${
                  transaction.type === 'EXPENSE' ? 'text-danger' : 'text-success'
                }`}
              >
                {Math.abs(transaction.amount).toFixed(2)}
              </td>
              <td>{transaction.account.name}</td>
              <td>{transaction.category.name}</td>
              <td key={transaction.date.toString()}>
                {formatBackendDate(transaction.date.toString())}
              </td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatBackendDate(dateStringFromBackend: string): string {
  const dateObject = new Date(dateStringFromBackend);

  const year = dateObject.getUTCFullYear();
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getUTCDate().toString().padStart(2, '0');
  const hours = dateObject.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
