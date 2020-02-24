import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getPoints, getCustomers } from './customers'
import { allPurchases } from './allPurchases'
import { purchases, customerNames, monthNames } from './purchases'

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>Purchase Rewards</h1>
                <h2>Customers&rsquo; Purchases by Month</h2>
                { getCustomers(this.props.purchases, this.props.customerNames, this.props.getPoints) }
                <h2>All Purchases</h2>
                { allPurchases(this.props.purchases, this.props.customerNames, this.props.getPoints) }
            </div>
        );
    }
}

ReactDOM.render(
    <App purchases={purchases} customerNames={customerNames} monthNames={monthNames} getPoints={getPoints} />,
    document.getElementById('root')
);
