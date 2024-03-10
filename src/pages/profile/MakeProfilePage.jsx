import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './makeprofilepage.css';

const MakeProfilePage = () => {
    const [username, setUsername] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isProfileCreated, setIsProfileCreated] = useState(false);

    const handleProfileCreation = async () => {
        try {
            const response = await fetch('http://localhost:2020/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any additional headers if needed
                },
                // Replace the following with the data you want to send for profile creation
                body: JSON.stringify({
                    username: username,
                    githubLink: githubLink,
                    phoneNumber: phoneNumber,
                }),
            });

            if (response.ok) {
                const createdProfile = await response.json();
                // Handle the created profile data as needed
                console.log('Profile created:', createdProfile);
            } else {
                // Handle error responses
                const errorData = await response.json();
                console.error('Error creating profile:', errorData);
            }
        } catch (error) {
            console.error('Error creating profile:', error.message);
        }
    };

    return (
        <>
            <Navbar />
            <center>
                <div className="make-profile-container" style={{ width: "40%" }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "bold", fontFamily: "poppins", color: "#643843" }}>Create Your Profile</h2>
                    <br /><br />
                    <form className="make-profile-form">
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
                            <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Phone number:</label>
                            <br />
                            <input
                                type="text"
                                placeholder="Enter phone number (OPTIONAL)"
                                value={phoneNumber}
                                style={{ width: "20rem", borderRadius: "6px" }}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="loginButton"
                            onClick={handleProfileCreation}
                            disabled={!username}
                        >
                            Continue -&gt;
                        </button>

                        {isProfileCreated && (
                            <p style={{ color: "#29a745", marginTop: "10px", fontSize: "18px" }}>Profile Created Successfully!</p>
                        )}
                    </form>
                </div>
            </center>
        </>
    );
};

export default MakeProfilePage;
