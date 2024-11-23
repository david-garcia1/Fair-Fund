import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

// import { retrieveTransactions }from '';
import ErrorPage from './ErrorPage';

import { ApiMessage } from '../Interfaces/Apimessage';

import auth from '../utils/auth';

const graphStates = ['Week', 'Month', 'YTD'];

const Home = () => {

    // const [Transactions, setTransactions] = useState<TransactionData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);   

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchTransactions = async () => {
        try {
            // const data = await retrieveTransactions();
            // setTransactions(data);
        } catch (err) {
            console.error('Failed to retrieve previous transactions: ', err);
            setError(true);
        }
    }

    const editTransaction = async (transactionId: number) : Promise<ApiMessage> => {
        try {
            const data = await editTransaction(transactionId);
            fetchTransactions();
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if(loginCheck) {
            fetchTransactions();
        }
    }, [loginCheck]);

    if(error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className=''>
                        <h1>
                            Log in!
                        </h1>
                    </div>
                ) : (
                    <div>placeholder</div>
                    // transaction graph, transaction table go here. will build in components.
                )
            }
        </>
    )
}

export default Home;