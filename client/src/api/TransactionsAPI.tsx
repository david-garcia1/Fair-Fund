import { Transaction } from "../Interfaces/Transaction";
import AuthService from '../utils/auth';

export const fetchUserTransactions = async (timeframe: string): Promise<Transaction[]> => {
    try {
        const userId = AuthService.decodeToken();
        console.log(userId);
        const response = await fetch(`/api/transactions/users/${userId}/${timeframe}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AuthService.getToken()}`,
            }
        }
        );
       
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Could not retrieve user transactions.');
        }
        return data;
        
    } catch (err) {
        throw new Error('Could not retrieve transactions');
    }
};

export const fetchTransactions = async () => {   
    const userId = AuthService.decodeToken();
    console.log(userId);
    const response = await fetch(`/api/transactions/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        }
    })
    return response.json();
}


export const addTransaction = async (transaction: any) => {
    const userId = AuthService.decodeToken();
    console.log(userId);
    const response = await fetch(`/api/transactions/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`
        },
        body: JSON.stringify(transaction),
    });
    if (!response.ok) {
        throw new Error("failed to add transaction");
    }
    return response.json();
};

export const updateTransaction = async (transactionId: string, transaction: any) => {
    const userId = AuthService.decodeToken();
    const response = await fetch(`api/transactions/users/${userId}/${transactionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
        body: JSON.stringify(transaction),
    });
    if (!response.ok) {
        throw new Error('Failed ot update transaction');
    }
    return response.json();
};

export const deleteTransaction = async (transactionId: string) => {
    const userId = AuthService.decodeToken();
    const response = await fetch(`/api/transactions/users/${userId}/${transactionId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to delete Transaction");
    }
    return response.json();
}

