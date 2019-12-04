import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { purchases, monthNames, customerNames } from './purchases'

const getPoints = (purchase) => {
    let points = 0;
    let doublePoints = purchase > 100 ? (purchase - 100) * 2 : 0;
    let singlePoints = purchase < 100 ? (purchase > 50 ? purchase - 50 : 0) : 50;
    points = singlePoints + doublePoints;
    return points;
};

const getMonthNumber = (date) => {
    return new Date(Date.parse(date)).getMonth();
};

const getCustomers = (purchases) => {
    let customerRecords = {};
    let customers = [];
    purchases.forEach((aPurchase) => {
        const monthNumber = getMonthNumber(aPurchase.date);
        if (!customerRecords.hasOwnProperty(aPurchase.customerId)) {
            customerRecords[aPurchase.customerId] = {
                months: {},
                totalPurchase: 0,
                totalPoints: 0
            };
        }
        if (!customerRecords[aPurchase.customerId].months.hasOwnProperty(monthNumber)) {
            customerRecords[aPurchase.customerId].months[monthNumber] = {
                monthlyPurchase: 0,
                monthlyPoints: 0
            }
        }
        customerRecords[aPurchase.customerId].months[monthNumber].monthlyPurchase += aPurchase.purchase;
        customerRecords[aPurchase.customerId].months[monthNumber].monthlyPoints += getPoints(aPurchase.purchase);
        customerRecords[aPurchase.customerId].totalPurchase += aPurchase.purchase;
        customerRecords[aPurchase.customerId].totalPoints += getPoints(aPurchase.purchase);
    });
    customers = Object.keys(customerRecords).sort();
    return (
        <div>
            { customers.map((customerData) => {
                let monthIndices = Object.keys(customerRecords[customerData].months);
                return (
                    <div key={customerData} className='customer'>
                        <h3>Customer: { customerNames[customerData] }</h3>
                        { monthIndices.map((aMonth) => {
                            return (
                                <p>
                                    Purchases for { monthNames[aMonth] }:
                                    ${ customerRecords[customerData].months[aMonth].monthlyPurchase }
                                    = { customerRecords[customerData].months[aMonth].monthlyPoints } Points
                                </p>
                            );
                        })}
                        <p>Total Purchases: ${ customerRecords[customerData].totalPurchase }
                            <span className='right'>Total Points: { customerRecords[customerData].totalPoints }</span>
                        </p>
                    </div>
                );
            }) }
        </div>
    );
};

class App extends React.Component {
  render() {
    return (
      <div className="app">
          <h1>Purchase Rewards</h1>
          <h2>Customers&rsquo; Purchases by Month</h2>
          { getCustomers(this.props.purchases) }
          <h2>All Purchases</h2>
          <table>
              <tr>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Purchase</th>
                  <th>Points</th>
              </tr>
          {this.props.purchases.map((aPurchase, index) => {
              return (
                  <tr key={index}>
                      <td>{ customerNames[aPurchase.customerId] }</td>
                      <td>{ aPurchase.date }</td>
                      <td>{ aPurchase.purchase }</td>
                      <td>{ getPoints(aPurchase.purchase) }</td>
                  </tr>
              );
          })}
          </table>
      </div>
    );
  }
}

ReactDOM.render(
  <App purchases={purchases} />,
  document.getElementById('root')
);
