import React from 'react'
import { Account } from '../../entities/Account/Account';

interface Props{
  account: Account,
  onDelete: (id: number) => void;
  onEdit: (account: Account) => void;
}

export const AccountCard: React.FC<Props> = ({ account, onDelete, onEdit}) => {

  const cardStyle = {
    width: '18rem',
  };

  const formattedBalance = account.balance.toFixed(2);
  const balanceColorClass = account.balance < 0 ? 'text-danger' : 'text-success';

  const deleteButtonClick = () => {
    onDelete(account.id);
  }

  const editButtonClick = () => {
    onEdit(account);
  }

  return (
    <div className="card" style={cardStyle}>
        <div className="card-body">
            <h5 className="card-title">{account.name}</h5>
            <h6 className={`card-subtitle mb-2 ${balanceColorClass}`}>
              $ {formattedBalance}
            </h6>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={editButtonClick}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={deleteButtonClick}
            >
              Delete
            </button>
        </div>
    </div>
  )
}
