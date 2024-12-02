import { Transaction } from "../Interfaces/Transaction";
import AuthService from '../utils/auth';

export const fetchUserTransactions = async (timeframe: string): Promise<Transaction[]> => {
    try {
        const userId = AuthService.decodeToken();
        console.log("transaction.userId:", userId)
        const response = await fetch(`/api/transactions/${userId}/${timeframe}`, {
            method: "GET",
            headers: {
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
    const response = await fetch(`/api/transactions/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
        }
    });
    if (!response.ok) {
        throw new Error('Error fetching transactions');
    }
    const data = response.json();
    console.log(data);
    return data;
}


export const addTransaction = async (transaction: any) => {
    const userId = AuthService.decodeToken();
    try {
    const response = await fetch(`/api/transactions/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthService.getToken()}`
        },
        body: JSON.stringify(transaction),
    });

    if (!response.ok) {
        throw new Error("Invalid API response, check network tab!");
    }
    const data = response.json()
    return data;
} catch (err) {
return Promise.reject('Could not create Transaction.')

}
    
};

export const updateTransaction = async (transactionId: string, transaction: any) => {
    const userId = AuthService.decodeToken();
    const transactionid = transactionId;
    const response = await fetch(`api/transactions/${userId}/${transactionid}`, {
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
    const updatedTransaction = await response.json();
    return updatedTransaction;
};

export const deleteTransaction = async (transactionId: string) => {
    const userId = AuthService.decodeToken();
    const response = await fetch(`/api/transactions/${userId}/${transactionId}`, {
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

