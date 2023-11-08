import React, { useContext, useEffect, useState } from 'react'
import { Account } from '../../entities/Account/Account';
import { Category } from '../../entities/Category/Category';
import { Modal } from '../Modal/Modal';
import { accountApi } from '../../services/AccountServices';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { categoryApi } from '../../services/CategoryServices';
import { TransactionCreateDto } from '../../entities/Transaction/Transaction';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    handleCreate: (newTransaction: TransactionCreateDto) => void;
}

export const CreateTransactionModal: React.FC<ModalProps> = ({ title, isOpen, onClose, handleCreate }) => {

  const auth = useContext(AuthContext);
  const accApi = accountApi();
  const catApi = categoryApi();

  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [amount, setAmount] = useState(0.0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [accountToCreate, setAccountToCreate] = useState<Account|null>(null);
  const [category, setCategory] = useState<Category|null>(null);

  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    setAmount(0.0);
    setType("");
    setDescription("");
    setAccountToCreate(null);
    setCategory(null);
    setIsFormValid(true);

    const getCategories = async () => {
        const data = await catApi.getCategories();
        if(data){
            setCategories(data);
        }
    }
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
    getCategories();
    console.log(categories);
  }, [isOpen]);

  const handleCreateTransaction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(accountToCreate && category && type !== "" && amount > 0 && description !== ""){
        const newTransaction: TransactionCreateDto = {
            type: type,
            amount: amount,
            description: description,
            accountId: accountToCreate?.id,
            userId: -1,
            categoryId: category.id
        };
        handleCreate(newTransaction);
        setIsFormValid(true);
    }
    else{
      setIsFormValid(false);
    }
  };

  return (
    <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
    >
        <form onSubmit={(event) => handleCreateTransaction(event)}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="account">Account</label>
          <select
            className="form-control"
            id="account"
            value={accountToCreate?.id.toString() || ''}
            onChange={(e) => {
              const selectedAccountId = e.target.value;
              const selectedAccount = accounts.find((acc) => acc.id.toString() === selectedAccountId);
              setAccountToCreate(selectedAccount || null);
            }}
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            value={category?.id || ''}
            onChange={(e) => {
              const selectedCategoryId = e.target.value;
              const selectedCat = categories.find((cat) => cat.id.toString() === selectedCategoryId);
              setCategory(selectedCat || null);
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>
        {!isFormValid && (
          <div className="alert alert-danger">
            Por favor, preencha todos os campos e faça as seleções necessárias.
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Transaction
        </button>
      </form>
    </Modal>
  )
}
