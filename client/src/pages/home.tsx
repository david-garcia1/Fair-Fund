import React from "react";
import TransactionManager from '../Components/TableComponents/ParentComponent';
import TransactionChart from "../Components/ChartComponent";



const HomePage: React.FC = () => {


    return (
        <div>
            <div>
                <div>
                    <h1 className='text-center mb-4'>Your Fair Fund</h1>
                    <div className='container'>
                        <div className='chart-container'>
                            <TransactionChart />
                        </div>
                    </div>
                        <div className='table-container'>
                            <TransactionManager />
                        </div>
                </div>
            </div>
        </div>
    )

}

export default HomePage;