import React, { Component } from 'react';

export class RegisterUser extends Component {
    static displayName = RegisterUser.name;

    constructor(props) {
        super(props);
        //this.state = { forecasts: [], loading: true };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append = this.firstName.value;
        data.append = this.lastName.value;
        data.append = this.email.value;
        data.append = this.confirmEmail.value;
        data.append = this.city.value;
        data.append = this.gender.value;
        data.append = this.country.value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:33767/registeruser/register', true);
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
                    <label htmlFor="FirstName">First Name: </label>
                    <input id="FirstName" type="text" placeholder="Enter First Name" ref={(firstName) => this.firstName = firstName} />
                    <label htmlFor="LastName">Last Name: </label>
                    <input id="LastName" type="text" placeholder="Enter Last Name" ref={(lastName) => this.lastName = lastName} />
                    <br /><br />
                    <label htmlFor="Email">Email: </label>
                    <input id="Email" type="text" placeholder="Enter Email" ref={(email) => this.email = email} />
                    <label htmlFor="ConfirmEmail">Confirm Email: </label>
                    <input id="ConfirmEmail" type="text" placeholder="Enter Confirm Email" ref={(confirmEmail) => this.confirmEmail = confirmEmail} />
                    <br /><br />
                    <label htmlFor="Gender">Gender: </label>
                    <input id="Gender" type="text" placeholder="Gender" ref={(gender) => this.gender = gender} />
                    <label htmlFor="City">City: </label>
                    <input id="City" type="text" placeholder="Enter City" ref={(city) => this.city = city} />
                    <br /><br />
                    <label htmlFor="Country">Country: </label>
                    <input id="Country" type="text" placeholder="Enter Country" ref={(country) => this.country = country} />
                    <br /><br />
                    <p>
                        <button type="submit">Submit</button>
                    </p>
                </form>
            </div>
        );
    }
}
    