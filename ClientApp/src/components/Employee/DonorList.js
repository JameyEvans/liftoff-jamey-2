import React, { Component } from 'react';

export class DonorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donorList: [],
            searchParam: '',
            searchTerm: '',
            isInputVisible: false,
        }
    }

    componentDidMount() {
        this.fetchDonorList();
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }
    fetchDonorList() {
        fetch('/Employee/GetDonorList')
            .then(response => response.json())
            .then(data => this.setState({ donorList: data }))
            .catch(error => console.error('Error fetching data:', error))

    }
    getShortenedGender(gender) {
        switch (gender) {
            case 'male': return "M";
            case 'female': return "F";
            default: return 'Other';
        }
    }
    render() {
        const { donorList } = this.state;
        return (
            <div>
                <div class="SearchBar">
                    <form>
                        <p>Search By:
                            <select id="searchParam" value={this.state.searchParam} onChange={this.handleChange} required>
                                <option value="">Select A Search Category</option>
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="gender">Gender</option>
                                <option value="bloodType">Blood Type</option>
                                <option value="address">Address</option>
                                <option value="state">State</option>
                            </select>
                        </p>
                        <input id="searchTerm" type="text" placeholder={`Enter Search Term`} value={this.state.searchTerm} onChange={this.handleChange} required />
                    </form>

                </div>
                <div class="DonorListTable">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Blood Type</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donorList.map((donor, index) => (
                                <tr key={index}>
                                    <td>{donor.id}</td>
                                    <td>{donor.firstName}</td>
                                    <td>{donor.lastName}</td>
                                    <td>{this.getShortenedGender(donor.gender)}</td>
                                    <td>{donor.dateOfBirth}</td>
                                    <td>{donor.bloodType}</td>
                                    <td>{donor.address}</td>
                                    <td>{donor.city}</td>
                                    <td>{donor.state}</td>
                                    <td>{donor.email}</td>
                                    <td>{donor.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}