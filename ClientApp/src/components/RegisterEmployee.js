import React, { Component } from 'react';


export class RegisterEmployee extends Component {
    static displayName = RegisterEmployee.name;

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
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
    resetForm() {
        this.setState({
            firstName: '',
            lastName: '',
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
        const url = '/Employee/Register';

        if (this.state.password === this.state.confirmPassword) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password
                })
            });
            this.resetForm();
        }
        else {
            console.log("PASSWORDS DO NOT MATCH");
        }




    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Register Employee</h2>

                    <p>
                        <label>First Name: </label>
                        <input id="firstName" type="text" placeholder="Enter First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                    </p>
                    <p>
                        <label>Last Name: </label>
                        <input id="lastName" type="text" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Address </label>
                        <input id="address" type="text" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>City </label>
                        <input id="city" type="text" placeholder="Enter City" value={this.state.city} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Country </label>
                        <input id="country" type="text" placeholder="Enter Country" value={this.state.country} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>E-mail </label>
                        <input id="email" type="text" placeholder="Enter E-Mail" value={this.state.email} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Phone Number </label>
                        <input id="phone" type="text" placeholder="Enter Phone Number" value={this.state.phone} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Password </label>
                        <input id="password" type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Confirm Password </label>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} required />
                    </p>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}


