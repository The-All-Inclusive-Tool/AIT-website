import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './makeprofilepage.css';

const MakeProfilePage = () => {
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [githubLink, setGithubLink] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isProfileCreated, setIsProfileCreated] = useState(false);

    const handleProfileCreation = () => {
        // Mock logic for profile creation
        // In a real application, you would send this data to your server and perform the necessary actions.
        console.log('Creating profile with:', {
            username,
            profilePicture,
            githubLink,
            phoneNumber,
        });

        // Show confirmation message
        setIsProfileCreated(true);
    };

    const handleFileChange = (e) => {
        // Display preview for the selected profile picture
        const file = e.target.files[0];
        setProfilePicture(file);

        // You can also add additional logic for file validation or resizing here
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
                            <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Profile Picture:</label>
                            <br />
                            <label className="profile-picture-label">
                                {profilePicture ? (
                                    <img
                                        src={URL.createObjectURL(profilePicture)}
                                        alt="Profile Preview"
                                        height="50px"
                                        width="50px"
                                        className="profile-picture-preview"
                                    />
                                ) : (
                                    <div className="profile-picture-placeholder">
                                        <span>+</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        <div className="input-group">
                            <label style={{ fontFamily: "Roboto", color: "#85586F" }}>Github Link:</label>
                            <br />
                            <input
                                type="text"
                                placeholder="Enter your Github link"
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

                        <button
                            type="button"
                            className="loginButton"
                            onClick={handleProfileCreation}
                            disabled={!username || !profilePicture}
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
