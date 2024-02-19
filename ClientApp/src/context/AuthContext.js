import React, { createContext, Component } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { }
});

export class AuthProvider extends Component {
    state = {
        isAuthenticated: false,
        user: null

    };

    login = (username, password) => {
        fetch('/Donor/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login Failed')
                }
                return response.json()
            })
            .then(data => {
                this.setState({ isAuthenticated: true, user: data.user, });
            })
            .catch(error => {
                console.error(`Authentication Error: ${error.message}`)
            });
    }
    render() {
        return (
            <AuthContext.Provider value={{
                isAuthenticated: this.state.isAuthenticated,
                user: this.state.user,
                login: this.login,
                logout: this.logout
            }}>
                {this.props.children }
            </AuthContext.Provider>)
    }
};