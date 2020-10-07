import React from 'react';

const getMonthNumber = (date) => {
    return new Date(Date.parse(date)).getMonth();
};

const getPoints = (purchase) => {
    let points = 0;
    let doublePoints = purchase > 100 ? (purchase - 100) * 2 : 0;
    let singlePoints = purchase < 100 ? (purchase > 50 ? purchase - 50 : 0) : 50;
    points = singlePoints + doublePoints;
    return points;
};

const GetCustomers = ({
    purchases,
    customerNames,
    monthNames,
    getPoints
}) => {
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
                                <p key={`${aMonth}${customerData}`}>
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

export {GetCustomers, getPoints};
