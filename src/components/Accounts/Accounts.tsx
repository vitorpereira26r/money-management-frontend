import React, { useContext, useEffect, useState } from 'react';
import { AccountCard } from '../AccountCard/AccountCard';
import { Account } from '../../entities/Account/Account';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { accountApi } from '../../services/AccountServices';
import { Modal } from '../Modal/Modal'; 

export const Accounts: React.FC = () => {
  const auth = useContext(AuthContext);
  const api = accountApi();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);

  const [newAccountName, setNewAccountName] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const getAccounts = async () => {
      const id = auth.user?.id;
      if (id) {
        const data = await api.getAccountsByUserId(id);
        if (data) {
          setAccounts(data);
        }
      }
    };
    getAccounts();
    setAccountToDelete(null);
    setAccountToEdit(null);
  }, []);

  const handleDelete = (account: Account) => {
    setAccountToDelete(account);
    setIsDeleteModalOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (accountToDelete) {
      const updatedAccounts: Account[] = accounts.filter((account) => account.id !== accountToDelete.id);
      setAccounts(updatedAccounts);
      setIsDeleteModalOpen(false);

      try {
        const response = await api.deleteAccount(accountToDelete.id);
        if (response.status === 404) {
          setAccounts([...updatedAccounts, accountToDelete]);
        }
      } catch (error) {
        console.error("Erro ao excluir a conta:", error);
        setAccounts([...updatedAccounts, accountToDelete]);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setAccountToDelete(null);
  };

  const handleConfirmEdit = async () => {
    if (accountToEdit) {
      try {
        const response = await api.editAccount(accountToEdit);
  
        if (response.status === 200) {
          editAccountToList(response.data);
        } 
      } catch (error) {
        console.error("Erro ao atualizar a conta:", error);
      }
  
      setIsEditModalOpen(false);
    }
  };

  const editAccountToList = (newAccount: Account) => {
    const accountIndex = accounts.findIndex((acc) => acc.id === newAccount.id);

    if(accountIndex !== -1){
      const updatedAccounts = [...accounts];
      updatedAccounts[accountIndex] = newAccount;
      setAccounts(updatedAccounts);
    }
    console.log(accounts);
  }

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setAccountToEdit(null);
  };

  const handleEdit = (account: Account) => {
    console.log("handle edit");
    console.log(account);

    setIsEditModalOpen(true);
    setAccountToEdit(account);
  };

  const handleCancelCreate = () => {
    setIsCreateModalOpen(false);
    setNewAccountName("");
  }

  const handleCreateButton = () => {
    setIsCreateModalOpen(true);
  }

  const createAccount = async () => {
    if(newAccountName !== ""){
      const userId = auth.user?.id;

      if(userId){
        try{
          const response = await api.createAccount(newAccountName, userId);

          if(response && response.status === 200){
            const newAccount: Account = response.data;

            setAccounts([...accounts, newAccount]);
          }
        }
        catch(error){
          console.error("Erro ao atualizar a conta:", error);
        }
      }
    }
    setNewAccountName("");
    setIsCreateModalOpen(false);
  }

  return (
    <div className="container mt-4">
      <h2>Accounts</h2>
      <button className='btn btn-success mb-3' onClick={handleCreateButton}>Create Account</button>
      <div className="row">
        {accounts.map((account, index) => (
          <div key={index} className="col-md-4 mb-4">
            <AccountCard account={account} onDelete={() => handleDelete(account)} onEdit={handleEdit} />
          </div>
        ))}
      </div>

      <Modal title="Delete Confirmation" isOpen={isDeleteModalOpen} onClose={handleCancelDelete}>
        <div className="modal-body">
          <p className="text-muted">Are you sure you want to delete this account?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>
            Confirm
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      </Modal>

      <Modal title="Edit Account" isOpen={isEditModalOpen} onClose={handleCancelEdit}>
        <div className="modal-body">
        {accountToEdit && (
          <div className="form-group">
            <label htmlFor="accountName">Account Name</label>
            <input
              type="text"
              id="accountName"
              className="form-control"
              value={accountToEdit.name}
              onChange={(e) => {
                const newName = e.target.value;
                setAccountToEdit((prevAccount) => {
                  if (!prevAccount) return prevAccount;
                  return {
                    ...prevAccount,
                    name: newName,
                  };
                });
              }}
            />
              {accountToEdit.name.trim() === "" && (
                <p className="text-danger">Please enter an account name.</p>
              )}
          </div>
          )}
        </div>
        <div className="modal-footer">
          {accountToEdit && accountToEdit.name.trim() === "" ? (
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-primary" onClick={handleConfirmEdit}>
                Confirm
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          )}
        </div>
      </Modal>

      <Modal title="Create Account" isOpen={isCreateModalOpen} onClose={handleCancelCreate}>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="newAccountName">Account Name</label>
            <input
              type="text"
              id="newAccountName"
              className="form-control"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
            />
          </div>
          {newAccountName.trim() === "" && (
            <p className="text-danger">Please enter an account name.</p>
          )}
        </div>
        <div className="modal-footer">
          {newAccountName.trim() === "" ? (
            <button type="button" className="btn btn-secondary" onClick={handleCancelCreate}>
              Cancel
            </button>
          ) : (
            <>
              <button type="button" className="btn btn-primary" onClick={createAccount}>
                Confirm
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancelCreate}>
                Cancel
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
