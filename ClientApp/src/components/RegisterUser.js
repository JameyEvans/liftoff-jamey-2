import React, { Component } from 'react';
import { useState } from 'react';

export class RegisterUser extends Component {
    static displayName = RegisterUser.name;

    constructor(props) {
        super(props);

        //this.state = { forecasts: [], loading: true };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
   
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append = this.firstName.value;
        data.append = this.lastName.value;
        data.append = this.email.value;
        data.append = this.confirmEmail.value;
        data.append = this.city.value;
        data.append = this.gender.value;
        data.append = this.country.value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:33767/Donor/Register', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // Do something on success
            }
        }
        xhr.send(data);
        
        //fetch("register", {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify(data)
        //   }).then(response => response.text());

        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>First Name: </label>
                        <input id="firstName" type="text" placeholder="Enter First Name"></input>
                    </p>
                    <p>
                        <label>Last Name: </label>
                        <input id="lastName" type="text" placeholder="Enter Last Name"></input>
                    </p>
                    <p>
                        <label>Gender: </label>
                        <select id="gender">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </p>
                    <p>
                        <label>Date of Birth: </label>
                        <input id="birthDate" type="text" placeholder="Enter Date of Birth"></input>
                    </p>
                    <p>
                        <label>Blood Type: </label>
                        <select id="bloodType">
                            <option value="">Select Blood Type</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                        </select>
                        <select id="rhFactor">
                            <option value="plus">+</option>
                            <option value="minus">-</option>
                        </select>
                    </p>
                    <p>
                        <label>Address </label>
                        <input id="address" type="text" placeholder="Enter Address"></input>
                    </p>
                    <p>
                        <label>City </label>
                        <input id="city" type="text" placeholder="Enter City"></input>
                    </p>
                    <p>
                        <label>Country </label>
                        <input id="country" type="text" placeholder="Enter Country"></input>
                    </p>
                    <p>
                        <label>E-mail </label>
                        <input id="email" type="text" placeholder="Enter E-Mail"></input>
                    </p>
                    <p>
                        <label>Phone Number </label>
                        <input id="phoneNumber" type="text" placeholder="Enter Phone Number"></input>
                    </p>
                    <p>
                        <label>Password </label>
                        <input id="password" type="password" placeholder="Enter Password"></input>
                    </p>
                    <p>
                        <label>Confirm Password </label>
                        <input id="confirmPassword" type="password" placeholder="Confirm Password"></input>
                    </p>
                </form>
            </div>
        );
    }
}
    