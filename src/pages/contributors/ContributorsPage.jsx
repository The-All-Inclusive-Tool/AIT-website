import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        // Fetch contributors data from the backend
        const fetchContributors = async () => {
            try {
                const response = await fetch('http://localhost:5000/get-all-users');
                if (response.ok) {
                    const contributorsData = await response.json();
                    setContributors(contributorsData);
                } else {
                    console.error('Failed to fetch contributors:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching contributors:', error.message);
            }
        };

        // Call the fetchContributors function
        fetchContributors();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <>
            <Navbar />
            <div style={{ backgroundColor: '#FDF0D1', margin: '0', overflow: 'hidden' }}>
                <Navbar />
                <center>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Poppins', marginBottom: '30px', color: '#643843' }}>
                        Find amazing open-source contributors here!
                    </h2>

                    {/* Display contributors data in cards */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '0 -10px' }}>
                        {contributors.map((contributor) => (
                            <div
                                key={contributor._id}
                                style={{
                                    width: '250px', // Reduced card width
                                    margin: '10px',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    backgroundColor: '#AC7D88',
                                    position: 'relative',
                                }}
                                onClick={() => console.log(`Clicked on ${contributor.username}'s card`)}
                            >
                                <img
                                    src='https://cdn-icons-png.flaticon.com/128/4140/4140061.png'
                                    alt="Profile"
                                    style={{ width: '100%', height: '120px', objectFit: 'cover', objectPosition: 'center' }}
                                />
                                <div style={{ padding: '15px', textAlign: 'left', background: "#AC7D88" }}>
                                    <h5
                                        style={{
                                            fontSize: '1.2rem', // Adjusted font size
                                            fontWeight: 'bold',
                                            background: "none",
                                            marginBottom: '8px',
                                            color: '#FDF0D1', // Adjusted text color
                                        }}
                                    >
                                        {contributor.username}
                                    </h5>
                                    <p style={{ fontSize: '0.9rem', color: '#FDF0D1', marginBottom: '10px', background: "none", }}>{contributor.email}</p>
                                    <a
                                        href={contributor.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#643843', // Adjusted text color
                                            background: "none",
                                            textDecoration: 'none',
                                            fontSize: '0.9rem',
                                            display: 'block',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        GitHub Profile
                                    </a>
                                    <a
                                        href={contributor.githubLink}
                                        target="new"
                                        rel="noopener noreferrer"
                                        style={{
                                            backgroundColor: '#85586F', // Adjusted button color
                                            color: '#FDF0D1', // Adjusted text color
                                            textDecoration: 'none',
                                            fontSize: '0.9rem',
                                            padding: '8px 15px',
                                            borderRadius: '5px',
                                            display: 'inline-block',
                                        }}
                                    >
                                        Collaborate
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </center>
            </div>
        </>
    );
};

export default ContributorsPage;
