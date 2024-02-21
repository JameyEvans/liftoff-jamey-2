import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class DonorDashboard extends Component{
    render() {
        return (
            <div>
                Hello logged-in donor!
                <div class="DonorDashboardNavbar">
                    <ul>
                        <li><Link to="/questionnaire">Eligibility Questionnaire</Link></li>
                        <li><Link to="/locate-bloodbank">Locate Blood Donation Sites Near You</Link></li>
                        <li><Link to="/account">Edit Account Information</Link></li>
                        <p>Contact Us</p>
                    </ul>
                </div>
            </div>
        );
    }
}