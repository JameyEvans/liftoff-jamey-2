import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class EmployeeDashboard extends Component {
    render() {
        return (
            <div>
                Hello logged-in Employee!
                <div class="DonorDashboardNavbar">
                    <ul>
                        <li><Link to="/donor-list">Donor List</Link></li>
                        <li> <Link to="/donation-history">Donation Records</Link></li>
                        <li>Blood Stock</li>
                        <li><Link to="/edit-employee-info">Edit Account Information</Link></li>

                    </ul>
                </div>
            </div>
        );
    }
}