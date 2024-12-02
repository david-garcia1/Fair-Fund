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
        setTransactions(data || []); 
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (transaction: Transaction) => {
    if(transaction.transactionId) {
    setSelectedTransaction(transaction);
    setModalOpen(true);
    }
  };

  const handleSave = async (transaction: Transaction) => {
    try {
      if (transaction.transactionId) {
      
        const updatedTransaction = await updateTransaction(transaction.transactionId, transaction);
        setTransactions(prevTransactions =>
          prevTransactions.map(t => (t.transactionId === transaction.transactionId ? updatedTransaction : t))
        );
      } else {
     
        const newTransaction = await addTransaction(transaction);
        setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
    setModalOpen(false);
    setSelectedTransaction(null);  
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions(prevTransactions => prevTransactions.filter(t => t.transactionId !== id));
        
        if (selectedTransaction?.transactionId === id) {
            setSelectedTransaction(null);
        }
        setModalOpen(false);
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
