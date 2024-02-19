import React, { createContext, Component, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../context/AuthContext'

// the only reason I'm keeping this stuff class-based instead of switching it over to a function is because we're too tight on time right now 
function DonorLoginFunction(props) {
    const navigate = useNavigate();
    //const { login } = useContext(AuthContext)
    return <DonorLogin navigate={navigate}/>
}
class DonorLogin extends Component {
    static displayName = DonorLogin.name;
    // static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        // this.login = props.login;
        this.handleChange = this.handleChange.bind(this)
        this.handleLoginAttempt = this.handleLoginAttempt.bind(this)
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

    handleLoginAttempt = (event) => {
        event.preventDefault();
        event.preventDefault();

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
                if (response.headers.get("content-type")?.includes("application/json")) {
                    return response.json();
                }
                throw new Error('No JSON response body');
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
                <form onSubmit={this.handleLoginAttempt}>
                    <h2>Donor Login</h2>
                    <p>
                        <label>Email: </label>
                        <input id="username" type="text" placeholder="Enter Email" value={this.state.username} onChange={this.handleChange} required />
                    </p>
                    <p>
                        <label>Password: </label>
                        <input id="password" type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} required />
                    </p>
                    <button type="submit">Login</button>
                </form>

            </div>
        );
    }
}
export default DonorLoginFunction;