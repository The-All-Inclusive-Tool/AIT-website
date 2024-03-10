import React, { useState } from 'react';
import './signuppage.css';
import Navbar from '../../components/navbar/Navbar';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:2020/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
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
                <h2 style={{ fontSize: "32px", fontFamily: "Poppins", fontWeight: "bold", color: "#643843", }}>Sign Up</h2>
                <form className="login-form">
                    <div className="input-group">
                        <label style={{ fontFamily: "roboto", color: "#643843" }}>Name:</label>
                        <input
                            style={{ background: "white", border: "1px solid black" }}
                            type="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label style={{ fontFamily: "roboto", color: "#643843" }}>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ fontFamily: "roboto", color: "#643843" }}>Password:</label>
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
                    Already have an account? <a href="#">Log In</a>
                </p>
            </div>
        </>
    );
};

export default SignUp;
