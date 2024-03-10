import React, { useState } from 'react';
import './loginpage.css';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:2020/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                    // fasdfdsafasd dfadf
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Handle authentication error
                console.error('Authentication failed');
                return;
            }

            const data = await response.json();
            // Assuming the server returns user information upon successful login
            console.log('User logged in:', data.user);

            // You may also want to redirect the user to another page upon successful login
            // You can use react-router or any other routing mechanism for this purpose
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h2 style={{ fontSize: "32px", fontFamily: "Poppins", fontWeight: "bold", color: "#643843", fontFamily: "Poppins" }}>Login</h2>
                <form className="login-form">
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

                    <button type="button" className="loginButton" onClick={handleLogin}>
                        Login
                    </button>
                </form>

                <p className="signup-text" style={{ color: "#643843", fontFamily: "Poppins" }}>
                    Don't have an account? <a href="#">Sign Up</a>
                </p>
            </div>
        </>
    );
};

export default Login;
