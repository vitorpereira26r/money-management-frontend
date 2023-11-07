import React, { useEffect, useState } from 'react'
import { Transaction, TransactionEditDto } from '../../entities/Transaction/Transaction';
import { Modal } from '../Modal/Modal';

interface ModalProps {
    title: string,
    isOpen: boolean,
    transaction: Transaction | null;
    onClose: () => void;
    handleEdit: (transaction: TransactionEditDto) => void;
}

export const EditTransactionModal:React.FC<ModalProps> = ({
    title,
    isOpen,
    transaction,
    onClose,
    handleEdit
}) => {

  const [amount, setAmount] = useState(transaction?.amount);
  const [type, setType] = useState(transaction?.type);
  const [description, setDescription] = useState(transaction?.description);

  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    setIsFormValid(true);
    setAmount(transaction?.amount);
    setType(transaction?.type);
    setDescription(transaction?.description);
  }, [isOpen]);

  const submitEdit = () => {

    if(type && type !== "" && amount && amount > 0 && description && description !== ""){
        const editedTransaction: TransactionEditDto = {
            type: type,
            amount: amount,
            description: description
        }

        handleEdit(editedTransaction);
        setIsFormValid(true);
    }
    else{
      setIsFormValid(false);
    }
  }
  
  return (
    <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
    >
        <form>
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
          <label htmlFor="type">Type</label>
          <select
            className="form-control mb-2"
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
            Por favor, preencha todos os campos obrigatórios.
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitEdit}
        >
          Edit Transaction
        </button>
      </form>
    </Modal>
  )
}
