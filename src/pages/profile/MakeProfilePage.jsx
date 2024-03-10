import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './makeprofilepage.css';

const MakeProfilePage = () => {
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [githubLink, setGithubLink] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isProfileCreated, setIsProfileCreated] = useState(false);
    const [imageLink, setImageLink] = useState('');

    const handleProfileCreation = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('profilePicture', profilePicture);
            formData.append('githubLink', githubLink);
            formData.append('phoneNumber', phoneNumber);

            const response = await fetch('http://localhost:2020/create-profile', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Profile creation failed');
                return;
            }

            const result = await response.json();
            console.log('Profile created:', result);

            // Set image link in the state
            setImageLink(result.imageLink);

            // Show confirmation message
            setIsProfileCreated(true);
        } catch (error) {
            console.error('Error creating profile:', error.message);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    return (
        <>
            <Navbar />
            <center>
                <div className="make-profile-container" style={{ width: "40%" }}>
                    {/* ... (unchanged code) */}

                    <button
                        type="button"
                        className="loginButton"
                        onClick={handleProfileCreation}
                        disabled={!username || !profilePicture}
                    >
                        Continue -&gt;
                    </button>

                    {isProfileCreated && (
                        <>
                            <p style={{ color: "#29a745", marginTop: "10px", fontSize: "18px" }}>Profile Created Successfully!</p>
                            {imageLink && (
                                <p style={{ marginTop: "10px", fontSize: "18px" }}>Image Link: {imageLink}</p>
                            )}
                        </>
                    )}
                </div>
            </center>
        </>
    );
};

export default MakeProfilePage;
