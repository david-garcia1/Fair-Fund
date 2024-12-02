import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../utils/auth';
import { Transaction } from '../Interfaces/Transaction';
import { fetchUserTransactions } from '../api/TransactionsAPI';
import Chart from 'chart.js/auto';

const TransactionChart: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [timeframe, setTimeframe] = useState<string>("week");

    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const fetchTransactions = async (timeframe: string) => {
        const userId = AuthService.decodeToken();
        if (!userId) {
            console.error("User ID not found");
            return;
        }

        try {
            const fetchedTransactions = await fetchUserTransactions(timeframe);
            setTransactions(fetchedTransactions);
        } catch (err) {
            console.error("Error fetching transactions:", err);
        }
    };

    useEffect(() => {
        fetchTransactions(timeframe);
    }, [timeframe]);

    const getChartData = () => {
        const labels = transactions.map(transaction => new Date(transaction.date).toLocaleDateString());
        const data = transactions.map(transaction => transaction.amount);

        return {
            labels: labels,
            datasets: [
                {
                    label: "Transaction Amount",
                    data: data,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75,192,192,0.2)",
                    fill: true,
                },
            ],
        };
    };

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) {
            return;
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: getChartData(),
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Transactions Over the last ${timeframe}`,
                    },
                },
                scales: {
                    x: {
                        type: "category",
                        labels: getChartData().labels,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [transactions, timeframe]);

    return (
        <div className="container">
            <h2>Transactions</h2>
            <div className="btn-group mb-4">
                <button className="btn btn-primary" onClick={() => setTimeframe("week")}>
                    Last Week
                </button>
                <button className="btn btn-primary" onClick={() => setTimeframe("month")}>
                    Last Month
                </button>
                <button className="btn btn-primary" onClick={() => setTimeframe("ytd")}>
                    Year to Date
                </button>
            </div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default TransactionChart;
