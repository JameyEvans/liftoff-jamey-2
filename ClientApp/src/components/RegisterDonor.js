import React, { Component } from 'react';

export class RegisterDonor extends Component {
    static displayName = RegisterDonor.name;

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            bloodType: '',
            rhFactor: '',
            address: '',
            city: '',
            country: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };
    // take the values from the 'blood type' and 'rh factor' dropdowns and combines them
    combineBloodTypeAndRhFactor() {
        const { bloodType, rhFactor } = this.state
        return bloodType + rhFactor
    }
    // clears all of the form values upon a  submission
    resetForm() {
        this.setState({
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            bloodType: '',
            rhFactor: '',
            address: '',
            city: '',
            country: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        })
    }
    // this allows for the program to adjust the value of the the user's input after interacting with the html components
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }
    handleRegistration = (data) => console.log(data)

    handleSubmit(event) {
        event.preventDefault();
        const url = '/Donor/Register';

        if (this.state.password === this.state.confirmPassword) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    dateOfBirth: this.state.dateOfBirth,
                    bloodType: this.combineBloodTypeAndRhFactor(),
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password
                })
            });
            this.resetForm()
        }
        else {
            console.log("PASSWORDS DO NOT MATCH")
        }




    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Register Donor</h2>

                    <p>
                        <label>First Name: </label>
                        <input id="firstName" type="text" placeholder="Enter First Name" value={this.state.firstName} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Last Name: </label>
                        <input id="lastName" type="text" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Gender: </label>
                        <select id="gender" value={this.state.gender} onChange={this.handleChange} >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </p>
                    <p>
                        <label>Date of Birth: </label>
                        <input id="dateOfBirth" type="text" placeholder="MM/DD/YYYY" value={this.state.dateOfBirth} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Blood Type: </label>
                        <select id="bloodType" value={this.state.bloodType} onChange={this.handleChange}>
                            <option value="">Select Blood Type</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                        <select id="rhFactor" value={this.state.rhFactor} onChange={this.handleChange}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                        </select>
                    </p>
                    <p>
                        <label>Address </label>
                        <input id="address" type="text" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>City </label>
                        <input id="city" type="text" placeholder="Enter City" value={this.state.city} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Country </label>
                        <input id="country" type="text" placeholder="Enter Country" value={this.state.country} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>E-mail </label>
                        <input id="email" type="text" placeholder="Enter E-Mail" value={this.state.email} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Phone Number </label>
                        <input id="phone" type="text" placeholder="Enter Phone Number" value={this.state.phone} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Password </label>
                        <input id="password" type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Confirm Password </label>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} />
                    </p>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}