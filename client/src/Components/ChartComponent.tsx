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
            return;
        }

        try {
            const fectchedTransactions = await fetchUserTransactions(timeframe);
            setTransactions(fectchedTransactions);
        } catch (err) {
            console.error("Error fetching transactions:", err);
        }
    };
    // empty array so that the chart loads on the mount and not just when a timeframe is clicked.
    useEffect(() => {
        const loadTransactions = async () => {
            await fetchTransactions(timeframe);
        };
        loadTransactions();
    }, [timeframe]);

    const getChartData = () => {
        const sortedTransactions = [...transactions].sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        const labels = sortedTransactions.map(transaction => new Date(transaction.date).toLocaleDateString());

        const data = sortedTransactions.reduce<number[]>((acc, transaction) => {
            let previousTotal = acc.length > 0 ? acc[acc.length - 1] : 0;
            acc.push(previousTotal + transaction.amount);
            return acc;
        }, []);
        return {
            labels: labels,
            datasets: [
                {
                    label: "Cumulative Transaction Amount",
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
        }
    }, [transactions, timeframe]);

    return (
        <div className="container">
            <h2>Transactions</h2>
            <div className="btn-group">
                <button className="btn btn-primary" onClick={() => setTimeframe("Week")}>
                    Last Week
                </button>
                <button className="btn btn-primary" onClick={() => setTimeframe("Month")}>
                    Last Month
                </button>
                <button className="btn btn-primary" onClick={() => setTimeframe("YTD")}>
                    Year to Date
                </button>
            </div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default TransactionChart;