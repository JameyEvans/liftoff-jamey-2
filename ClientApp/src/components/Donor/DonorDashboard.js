import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class DonorDashboard extends Component{
    render() {
        return (
            <div>
                Hello logged-in donor!
                <div class="DonorDashboardNavbar">
                    <ul>
                        <li><Link to="questionnaire">Questionnaire</Link></li>
                        <li>Schedule An Appointment</li>
                        <li>Locate Blood Donation Sites</li>
                        <li><Link to="/edit-donor-info">Edit Account Information</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}