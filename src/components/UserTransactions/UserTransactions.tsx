import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { transactionApi } from '../../services/TransactionsServices';
import { Transaction, TransactionCreateDto, TransactionEditDto } from '../../entities/Transaction/Transaction';
import { Account } from '../../entities/Account/Account';
import { accountApi } from '../../services/AccountServices';
import { CreateTransactionModal } from '../CreateTransactionModal/CreateTransactionModal';
import { Modal } from '../Modal/Modal';
import { EditTransactionModal } from '../EditTransactionModal/EditTransactionModal';

export const UserTransactions: React.FC = () => {
  const auth = useContext(AuthContext);
  const api = transactionApi();
  const accApi = accountApi();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction|null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction|null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      const id = auth.user?.id;

      if (id) {
        const data = await api.getTransactionsByUserId(id);
        if (data) {
          setTransactions(data);
        }
      }
    };

    const getAccounts = async () => {
      const id = auth.user?.id;
      if (id) {
        const data = await accApi.getAccountsByUserId(id);
        if (data) {
          setAccounts(data);
        }
      }
    };

    getAccounts();
    getTransactions();
  }, []);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  }

  const handleCreateTransaction = async (newTransaction: TransactionCreateDto) => {
    if(newTransaction && auth.user?.id){
        newTransaction.userId = auth.user.id;

        try{
            const response = await api.createTransaction(newTransaction);

            if(response !== null){
                const transaction: Transaction = response;

                setTransactions([...transactions, transaction]);
            }
        }
        catch(error){
            console.error("Erro ao atualizar a conta:", error);
        }
        closeCreateModal();
    }
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  }

  const openEditModal = (transaction: Transaction) => {
    setIsEditModalOpen(true);
    setTransactionToEdit(transaction)
  }

  const handleEditTransaction = async (transaction: TransactionEditDto) => {
    if(transaction && transactionToEdit){

        console.log("handling edit transaction: " + transaction);

        const response = await api.editTransaction(transaction, transactionToEdit.id);

        if(response){
            editTransactionToList(response);
        }
        closeEditModal();
    }
  }
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTransactionToEdit(null);
  }

  const editTransactionToList = (newTransaction: Transaction) => {
    const transactionIndex = transactions.findIndex((t) => t.id === newTransaction.id);

    if(transactionIndex !== -1){
        const updatedTransactions = [...transactions];
        updatedTransactions[transactionIndex] = newTransaction;
        setTransactions(updatedTransactions);
    }
  }

  const openDeleteModal = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setIsDeleteModalOpen(true);
  }

  const handleDeleteConfirmation = async () => {
    if(transactionToDelete){
        const updatedTransactions: Transaction[] = transactions.filter((t) => t.id !== transactionToDelete.id);
        setTransactions(updatedTransactions);
        setIsDeleteModalOpen(false);

        try{
            const response = await api.deleteAccount(transactionToDelete.id);

            if(response.status === 404){
                setTransactions([...updatedTransactions, transactionToDelete]);
            }
        }
        catch(error){
            setTransactions([...updatedTransactions, transactionToDelete]);
            console.error("Erro ao excluir a conta:", error);
        }
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTransactionToDelete(null);
  }

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
      <button className='btn btn-outline-secondary'>
        <a href="/home" className='nav-link' data-cy={"back-home-btn"}>Back to home page</a>
      </button>
      <h2>{auth.user?.username}'s transactions</h2>
      <button className="btn btn-success mb-3" onClick={openCreateModal} data-cy={"create-transaction-btn"}>Create Transaction</button>
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
            >
              <option value="">All</option>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
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
            <th scope="col" key="actions">
              Actions
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
              <td>
                <button
                    className="btn btn-primary"
                    onClick={() => openEditModal(transaction)}
                    data-cy={`edit-transaction-${transaction.id}-btn`}
                >
                    Edit
                </button>{" "}
                <button
                    className="btn btn-danger"
                    onClick={() => openDeleteModal(transaction)}
                    data-cy={`delete-transaction-${transaction.id}-btn`}
                >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal title="Delete Confirmation" isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className="modal-body">
          <p className="text-muted">Are you sure you want to delete this account?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleDeleteConfirmation} data-cy={"delete-transaction-confirm-btn"}>
            Confirm
          </button>
          <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </Modal>

      <EditTransactionModal
        title='Edit Transaction'
        isOpen={isEditModalOpen}
        transaction={transactionToEdit}
        onClose={closeEditModal}
        handleEdit={handleEditTransaction}
      />

      <CreateTransactionModal
        title='Create Transaction'
        onClose={closeCreateModal}
        isOpen={isCreateModalOpen}
        handleCreate={handleCreateTransaction}
      />
      
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
