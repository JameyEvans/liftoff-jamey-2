import React, { Component } from 'react';

export class AddDonation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donorID: '',
            date: '',
            time: '',
            servicingEmployee: '',
            location: '',
            employeeList: [],
            dayPeriod: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getEmployeeList()
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();

        const fullTime = `${this.state.time}${this.state.dayPeriod}`

        fetch('/Donation/AddDonation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DonorId: parseInt(this.state.donorID),
                date: this.state.date,
                time: fullTime,
                servicingEmployee: this.state.servicingEmployee,
                location: this.state.location
            })
        })
        alert("Donation added successfully")
    }
    

// get employee list for the "Servicing Employee" option
getEmployeeList() {
    fetch('/Employee/GetEmployeeList')
        .then(response => response.json())
        .then(data => this.setState({ employeeList: data }))
        .catch(error => console.error('Error fetching data:', error))
}

render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <h2>Add Donation</h2>

                <p>
                    <label>Donor ID: </label>
                    <input id="donorID" type="number" placeholder="Enter Donor ID" value={this.state.donorID} onChange={this.handleChange} required />
                </p>
                <p>
                    <label>Date: </label>
                    <input id="date" type="text" placeholder="MM/DD/YYYY" value={this.state.date} onChange={this.handleChange} required />
                </p>
                <p>
                    <label>Time: </label>
                    <input id="time" type="text" placeholder="HH:MM" value={this.state.time} onChange={this.handleChange} required />
                    <select id="dayPeriod" value={this.state.dayPeriod} onChange={this.handleChange} required>
                        <option value="">Select AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </p>
                <p>
                    <label>Servicing Employee </label>
                    <select id="servicingEmployee" value={this.state.servicingEmployee} onChange={this.handleChange} required>
                        <option value="">Select an employee</option>
                        {this.state.employeeList.map((employee, index) => (<option key={index} value={`${employee.firstName} ${employee.lastName}`}>{employee.firstName} {employee.lastName}</option>))}
                    </select>
                </p>
                <p>
                    <label>Location </label>
                    <input id="location" type="text" placeholder="Enter Location" value={this.state.location} onChange={this.handleChange} required />
                </p>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
          
 
}
