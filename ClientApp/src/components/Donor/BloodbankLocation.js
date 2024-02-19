import React, { Component } from 'react';

export class BloodbankLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            coordinates: [],
            error: '',
            nearbyBloodBanks: []
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { address } = this.state;
        this.setState({ error: '' });

        fetch('/Donor/GeocodeAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Address: address }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Response Data:", data);

                this.setState({
                    coordinates: data
                }, () => {

                    this.LocateBloodbanks(this.state.coordinates);
                });
            })
            .catch(error => {
                this.setState({ error: 'Failed to fetch information.' });
                console.error('Error fetching coordinates', error);
            });
    }


    LocateBloodbanks = (coordinates) => {

        const params = new URLSearchParams({
            Latitude: coordinates.latitude,
            Longitude: coordinates.longitude
        }).toString();

        fetch(`/Donor/LocateNearbyDonationSites?${params}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network was not okay')
                }
                return response.json();
            })
            .then(data => {
                console.log("Nearby blood banks:", data);
                this.setState({ nearbyBloodBanks: data });
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({ error: 'Failed to fetch nearby blood banks' })
            })
    }

render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    placeholder="Enter your address"
                />
                <button type="submit">Submit</button>
            </form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.nearbyBloodBanks.map((bloodbank, index) => (
                            <tr key={index}>
                                <td>{bloodbank.name}</td>
                                <td>{bloodbank.address}</td>
                            </tr>
                        ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}
}