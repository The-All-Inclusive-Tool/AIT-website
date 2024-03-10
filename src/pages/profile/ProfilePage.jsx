import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './profilepage.css';

const ProfilePage = () => {
    const userData = {
        username: 'JohnDoe',
        profilePicture: null,
        githubLink: 'https://github.com/JohnDoe',
        phoneNumber: '123-456-7890',
        peopleHelped: 15,
        inclusiveOptionsTaken: 9,
    };

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState({ ...userData });

    const handleEditToggle = () => {
        setIsEditMode((prev) => !prev);
    };

    const handleSaveChanges = () => {
        console.log('Saving changes:', editedUserData);
        setIsEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditedUserData({ ...userData });
        setIsEditMode(false);
    };

    const handleInputChange = (field, value) => {
        setEditedUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <>
            <Navbar />
            <center>
                <div className="profile-container">
                    <br />
                    <h2 style={{ color: '#643843', fontSize: "32px", fontWeight: "bold", fontFamily: "poppins" }}>{editedUserData.username}'s Profile</h2>

                    <div className="profile-picture">
                        {editedUserData.profilePicture ? (
                            <img src={editedUserData.profilePicture} alt="Profile" />
                        ) : (
                            <div className="profile-picture-placeholder">
                                <span>+</span>
                            </div>
                        )}
                    </div>

                    <div className="profile-details">
                        <label style={{ color: '#85586F' }}>Username:</label>
                        <br />
                        <input
                            type="text"
                            value={editedUserData.username}
                            readOnly={!isEditMode}
                            style={{ width: '20rem', borderRadius: '6px' }}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                        />
                        <br />
                        <label style={{ color: '#85586F' }}>Github Link:</label>
                        <br />
                        <input
                            type="text"
                            value={editedUserData.githubLink}
                            readOnly={!isEditMode}
                            style={{ width: '20rem', borderRadius: '6px' }}
                            onChange={(e) => handleInputChange('githubLink', e.target.value)}
                        />
                        <br />
                        <label style={{ color: '#85586F' }}>Phone Number (Optional):</label>
                        <br />
                        <input
                            type="text"
                            value={editedUserData.phoneNumber}
                            readOnly={!isEditMode}
                            style={{ width: '20rem', borderRadius: '6px' }}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        />
                    </div>

                    {isEditMode ? (
                        <div className="edit-buttons">
                            <button
                                type="button"
                                className="loginButton"
                                onClick={handleSaveChanges}
                            >
                                Save
                            </button>
                            <span style={{ margin: '0 1rem' }}></span>
                            <button
                                type="button"
                                className="loginButton"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="loginButton"
                            onClick={handleEditToggle}
                        >
                            Edit
                        </button>
                    )}

                    <br /><br />
                    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
                        <h3 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Dashboard</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: '1', margin: '0 10px', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: '#FAD02E', padding: '20px', color: '#85586F' }}>
                                    <p style={{ margin: '0', fontSize: '18px' }}>People Helped</p>
                                    <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>{editedUserData.peopleHelped}</p>
                                </div>
                            </div>

                            <div style={{ flex: '1', margin: '0 10px', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ backgroundColor: '#4CAF50', padding: '20px', color: '#85586F' }}>
                                    <p style={{ margin: '0', fontSize: '18px' }}>Inclusive Options Taken</p>
                                    <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>{editedUserData.inclusiveOptionsTaken} times</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                </div>
            </center>
        </>
    );
};

export default ProfilePage;
