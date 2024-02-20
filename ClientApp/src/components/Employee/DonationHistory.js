import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class DonationHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donationList: []
        }
        // this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.fetchDonationHistory()
    }

    fetchDonationHistory() {
        fetch('/Donation/GetDonationHistory')
            .then(response => response.json())
            .then(data => this.setState({ donationList: data }))
            .catch(error => console.error('Error fetching data:', error))
    }

    render() {
        return (
            <div>
                <div class="historyTable">
                    <table>
                        <thead>
                            <th>Donation ID</th>
                            <th>Donor ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Servicing Employee</th>
                            <th>Location</th>
                        </thead>
                        <tbody>
                            {this.state.donationList.map((donation, index) => (
                                <tr key={index}>
                                    <td>{donation.donationID}</td>
                                    <td>{donation.donorId}</td>
                                    <td>{donation.date}</td>
                                    <td>{donation.time}</td>
                                    <td>{donation.servicingEmployeeName}</td>
                                    <td>{donation.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/donation-history/add-donation">Add Donation To Record</Link>
            </div>
        );
    }
}