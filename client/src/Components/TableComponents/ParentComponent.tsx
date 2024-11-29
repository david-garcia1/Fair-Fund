import React, { useState, useEffect } from "react";
import TransactionTable from "./Table";
import TransactionModal from "./Modal";
import {
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} from "../../api/TransactionsAPI";
import AuthService from '../../utils/auth';
import { Transaction } from "../../Interfaces/Transaction";

const TransactionManager: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const userId = AuthService.decodeToken;


    useEffect(() => {
        const grabTransactions = async () => {
            try {
                const response = await fetchTransactions();
                const data = response;
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        grabTransactions();
    }, [userId]);


    const handleModalOpen = (transaction: Transaction | null = null) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };


    const handleCreateTransaction = async (newTransaction: Partial<Transaction>) => {
        try {
            const createdTransaction = await addTransaction({ ...newTransaction, userId });
            setTransactions((prev) => [...prev, createdTransaction]);
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };


    const handleEditTransaction = async (transactionId: number, updatedData: Partial<Transaction>) => {
        try {
            const updatedTransaction = await updateTransaction(transactionId, updatedData);
            setTransactions((prev) =>
                prev.map((transaction) => (transaction.id === transactionId ? updatedTransaction : transaction))
            );
        } catch (error) {
            console.error("Error updating transaction:", error);
        }
    };


    const handleDeleteTransaction = async (transactionId: number) => {
        try {
            await deleteTransaction(transactionId);
            setTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div>
            <h1>Transaction Manager</h1>
            <TransactionTable
                transactions={transactions}
                onEdit={handleModalOpen}
                onDelete={handleDeleteTransaction}
            />
            <TransactionModal
                isOpen={isModalOpen}
                transaction={selectedTransaction}
                onClose={handleModalClose}
                onSave={async (transactionData) => {
                    if (selectedTransaction) {
                        await handleEditTransaction(selectedTransaction.id, transactionData);
                    } else {
                        await handleCreateTransaction(transactionData);
                    }
                }}
            />

        </div>
    );
};

export default TransactionManager;
