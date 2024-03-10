import React, { useState } from 'react';
import './signuppage.css';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isProfileCreated, setIsProfileCreated] = useState(false);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password, username, githubLink, phoneNumber }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {

                console.error('Registration failed');

                return;
            }

            const result = await response.json();

            // Check if the server response contains the expected data
            if (result) {
                console.log(result);



            }
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };


    return (
        <>
            <Navbar />
            <div className="login-container">
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <h2 style={{ fontSize: "32px", fontFamily: "Poppins", fontWeight: "bold", color: "#643843", }}>Sign Up</h2>
                <form className="login-form">
                    <div className="input-group">

                        <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Name:</label>
                        <input
                            style={{ background: "white", border: "1px solid black" }}
                            type="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Username:</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            style={{ width: "20rem", borderRadius: "6px" }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Github link:</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter your github link"
                            value={githubLink}
                            style={{ width: "20rem", borderRadius: "6px" }}
                            onChange={(e) => setGithubLink(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Phone number (OPTIONAL):</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            style={{ width: "20rem", borderRadius: "6px" }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="password-toggle"
                            style={{ color: "#85586F" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>

                    <button type="button" className="loginButton" onClick={handleRegister}>
                        Sign Up
                    </button>
                </form>

                <p className="signup-text" style={{ color: "#643843", fontFamily: "Poppins" }}>
                    <Link to="/login">Already have an account? <a href="#">Log In</a></Link>
                </p>
                <br /><br /><br /><br /><br /><br />
            </div>
        </>
    );
};

export default SignUp;
