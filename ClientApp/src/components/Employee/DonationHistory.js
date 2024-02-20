import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class DonationHistory extends Component {
    render() {
        return (
            <div>
                <li><Link to="/donation-history/add-donation">Add Donation To Record</Link></li>
            </div>
        );
    }
}