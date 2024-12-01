import React, { useState, useEffect } from 'react';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../api/TransactionsAPI'; 
import TransactionTable from './Table';
import TransactionModal from './Modal';
import { Transaction } from '../../Interfaces/Transaction';

const TransactionManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleSave = async (transaction: Transaction) => {
    try {
      if (transaction.id) {
        const updatedTransaction = await updateTransaction(transaction.id, transaction);
        setTransactions(prev =>
          prev.map(t => (t.id === transaction.id ? updatedTransaction : t))
        );
      } else {
        const newTransaction = await addTransaction(transaction);
        setTransactions(prev => [...prev, newTransaction]);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <button onClick={() => setModalOpen(true)}>Add Transaction</button>

      <TransactionTable 
        transactions={transactions} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <TransactionModal 
        isOpen={isModalOpen}
        transaction={selectedTransaction}
        onClose={() => setModalOpen(false)} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default TransactionManager;
