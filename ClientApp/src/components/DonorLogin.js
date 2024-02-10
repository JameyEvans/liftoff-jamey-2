import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom'

function DonorLoginFunction(props) {
    let navigate = useNavigate();
    return <DonorLogin navigate={navigate} />
}
class DonorLogin extends Component {
    static displayName = DonorLogin.name;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleLogin.bind(this)
    };

    // clears all of the form values upon a  submission
    resetForm() {
        this.setState({
            username: '',
            password: ''
        })
    }
    // this allows for the program to adjust the value of the the user's input after interacting with the html components
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleLogin = (event) => {
        event.preventDefault();
        console.log(this.state)
        fetch('/Donor/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: this.state.username,
                    password: this.state.password
                })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Response Failed')
                }
                return response.json()
            })
            .then(data => {
                this.props.navigate('/donor-dashboard');
            })
            .catch(error => {
                console.error(`Error Message ${error.message}`)
            });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <h2>Donor Login</h2>
                    <p>
                        <label>Email: </label>
                        <input id="username" type="text" placeholder="Enter Email" value={this.state.username} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Password: </label>
                        <input id="password" type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                    </p>
                    <button type="submit">Login</button>
                </form>

            </div>
        );
    }
}
export default DonorLoginFunction;