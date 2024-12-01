import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Transaction } from '../../Interfaces/Transaction';

interface TransactionModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, transaction, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({
    date: '',
    description: '',
    amount: '',
  });

  useEffect(() => {
    if (transaction) {
      setFormValues({
        date: transaction.Date || '',
        description: transaction.description || '',
        amount: transaction.amount.toString() || '',
      });
    } else {
      setFormValues({ date: '', description: '', amount: '' });
    }
  }, [transaction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
      ...transaction,
      date: formValues.date,
      description: formValues.description,
      amount: parseFloat(formValues.amount),
    } as Transaction);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', background: 'white', margin: '10% auto', width: '30%' }}>
        <h2>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <TextField
          name="date"
          type="date"
          value={formValues.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={formValues.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="amount"
          label="Amount"
          type="number"
          value={formValues.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default TransactionModal;

