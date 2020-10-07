import React from 'react';

const AllPurchases = ({
    purchases,
    customerNames,
    getPoints
}) => {
    return (
        <div>
            <table>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
}

export {AllPurchases};
