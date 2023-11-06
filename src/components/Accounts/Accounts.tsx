import React, { useContext, useEffect, useState } from 'react';
import { AccountCard } from '../AccountCard/AccountCard';
import { Account } from '../../entities/Account/Account';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { accountApi } from '../../services/AccountServices';
import { Modal } from '../Modal/Modal'; // Importe o componente Modal que você já possui

export const Accounts: React.FC = () => {
  const auth = useContext(AuthContext);
  const api = accountApi();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

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
  }, []);

  const handleDelete = (account: Account) => {
    setAccountToDelete(account);
    setIsModalOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (accountToDelete) {
      const updatedAccounts: Account[] = accounts.filter((account) => account.id !== accountToDelete.id);
      setAccounts(updatedAccounts);
      setIsModalOpen(false);

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
    setIsModalOpen(false);
    setAccountToDelete(null);
  };

  const handleEdit = (account: Account) => {
    console.log("handle edit");
    console.log(account);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {accounts.map((account, index) => (
          <div key={index} className="col-md-4 mb-4">
            <AccountCard account={account} onDelete={() => handleDelete(account)} onEdit={handleEdit} />
          </div>
        ))}
      </div>

      <Modal title="Confirmação de Exclusão" isOpen={isModalOpen} onClose={handleCancelDelete}>
        <div className="modal-body">
          <p className="text-muted">Tem certeza de que deseja excluir esta conta?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>
            Confirmar
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};
