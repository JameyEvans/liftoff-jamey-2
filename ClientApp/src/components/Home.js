import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    fetchData() {
        fetch('/Donor')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error connecting to the database:', error));
    }

    render() {
        const data = this.fetchData;
        return (
            <div>
            Home Page
            </div>
        );
    }
}
