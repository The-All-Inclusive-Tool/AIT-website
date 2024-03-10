import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './profilepage.css';

const ProfilePage = () => {
    const userData = {
        username: 'Armaan',
        profilePicture: null,
        githubLink: 'https://github.com/0Armaan025',
        phoneNumber: '',
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

                    <br /><br /><br />
                </div>
            </center>
        </>
    );
};

export default ProfilePage;
