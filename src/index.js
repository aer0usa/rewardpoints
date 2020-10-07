import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getPoints, GetCustomers } from './customers'
import { AllPurchases } from './allPurchases'
import { purchases, customerNames, monthNames } from './purchases'

const App = ({
    purchases,
    customerNames,
    getPoints
}) => {
    return (
        <div className="app">
            <h1>Purchase Rewards</h1>
            <h2>Customers&rsquo; Purchases by Month</h2>
            <GetCustomers 
                purchases={purchases}
                customerNames={customerNames}
                monthNames={monthNames}
                getPoints={getPoints}
            />
            <h2>All Purchases</h2>
            <AllPurchases purchases={purchases} customerNames={customerNames} getPoints={getPoints} />
        </div>
    );
}

ReactDOM.render(
    <App purchases={purchases} customerNames={customerNames} monthNames={monthNames} getPoints={getPoints} />,
    document.getElementById('root')
);
