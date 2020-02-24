import React from 'react';

class AllPurchases extends React.Component {
    render () {
        return (
            <div>
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
                                <td>{ this.props.customerNames[aPurchase.customerId] }</td>
                                <td>{ aPurchase.date }</td>
                                <td>{ aPurchase.purchase }</td>
                                <td>{ this.props.getPoints(aPurchase.purchase) }</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}

export {AllPurchases};
