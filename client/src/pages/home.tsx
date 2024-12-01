import React from "react";
import TransactionManager from '../Components/TableComponents/ParentComponent';
import TransactionChart from "../Components/ChartComponent";



const HomePage: React.FC = () => {


    return (
        <div>
            <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
                    <h1 className='text-center mb-4'>Your Fair Fund</h1>
                    <div className='mb-5' style={{ height: "400px" }}>
                        <div className='chart-container' style={{ width: '100%', height: "400px" }}>
                            <TransactionChart />
                        </div>
                    </div>
                        <div className='justify-content-between align-items-center mb-4'>
                            <TransactionManager />
                        </div>
                </div>
            </div>
        </div>
    )

}

export default HomePage;