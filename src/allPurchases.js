import React from 'react';

const allPurchases = (purchases, customerNames, getPoints) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Purchase</th>
                    <th>Points</th>
                </tr>
                {purchases.map((aPurchase, index) => {
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
};

export {allPurchases};
