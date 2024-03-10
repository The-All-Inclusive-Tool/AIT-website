import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './makeprofilepage.css';

const MakeProfilePage = () => {


    // const handleProfileCreation = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5000/create-profile', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // Include any additional headers if needed
    //             },
    //             // Replace the following with the data you want to send for profile creation
    //             body: JSON.stringify({
    //                 username: username,
    //                 githubLink: githubLink,
    //                 phoneNumber: phoneNumber,
    //             }),
    //         });

    //         if (response.ok) {
    //             const createdProfile = await response.json();
    //             // Handle the created profile data as needed
    //             console.log('Profile created:', createdProfile);
    //         } else {
    //             // Handle error responses
    //             const errorData = await response.json();
    //             console.error('Error creating profile:', errorData);
    //         }
    //     } catch (error) {
    //         console.error('Error creating profile:', error.message);
    //     }
    // };

    return (
        <>
            <Navbar />
            <center>
                <div className="make-profile-container" style={{ width: "40%" }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "bold", fontFamily: "poppins", color: "#643843" }}>Create Your Profile</h2>
                    <br /><br />
                    <form className="make-profile-form">


                        {/* <button
                            type="button"
                            className="loginButton"
                            onClick={handleProfileCreation}
                            disabled={!username}
                        >
                            Continue -&gt;
                        </button> */}

                        {/* {isProfileCreated && (
                            <p style={{ color: "#29a745", marginTop: "10px", fontSize: "18px" }}>Profile Created Successfully!</p>
                        )} */}
                    </form>
                </div>
            </center>
        </>
    );
};

export default MakeProfilePage;
