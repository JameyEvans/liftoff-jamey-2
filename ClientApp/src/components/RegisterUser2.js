import React, { useState } from 'react';

const RegisterUser2 = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== emailConfirmation) {
            setMessage('Emails do not match');
            setIsError(true);
            return;
        }
        if (password !== passwordConfirmation) {
            setMessage('Passwords do not match');
            setIsError(true);
            return;
        }

        const payload = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            ConfirmPassword: passwordConfirmation,
            Gender: gender,
            City: city,
            Country: country
        }

        try{
            const response = await fetch('registeruser/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const responseJson = await response.json();

            if (responseJson.status === 'success') {
                setIsError(false);
                setMessage('');
            } else {
                setIsError(true);
                setMessage(responseJson.message);
            }
        }
        catch (error) {
            setMessage('There was an error registering the user');
            setIsError(true);           
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            {isError && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="emailConfirmation">Confirm Email:</label>
                    <input
                        type="email"
                        id="emailConfirmation"
                        value={emailConfirmation}
                        onChange={(e) => setEmailConfirmation(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirm Password:</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterUser2;

