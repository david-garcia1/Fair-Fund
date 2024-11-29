import React from "react";
import TransactionManager from '../Components/TableComponents/ParentComponent';
import TransactionChart from "../Components/ChartComponent";



const HomePage: React.FC = () => {


    return (
        <div>
            <div>
                <div className="container my-4">
                    <h1 className='text-center mb-4'>Your Fair Fund</h1>
                    <div className='mb-5'>
                        <div className='chart-container' style={{ width: '100%', height: "400px" }}>
                            <TransactionChart />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <TransactionManager />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomePage;