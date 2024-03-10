import React, { useState, useEffect } from 'react';
import './projectspage.css';
import Navbar from '../../components/navbar/Navbar';

const ProjectsPage = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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', // Replace with your GitHub personal access token
          },
          body: JSON.stringify({
            query: `
              query {
                search(query: "label:open-source", type: REPOSITORY, first: 100) {
                  edges {
                    node {
                      ... on Repository {
                        name
                        description
                        url
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        const result = await response.json();

        if (result.data && result.data.search && result.data.search.edges) {
          setRepositories(result.data.search.edges.map((edge) => edge.node));
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <>
      <Navbar />
      <center>
        <h3 style={{ fontSize: "32px", fontWeight: "bold", fontFamily: "Poppins", color: "#643843" }}>Open Source Projects 🚀</h3>
      </center>
      <div className="projects-container" >
        {repositories.map((repo) => (
          <div key={repo.name} className="project-card" style={{ margin: "10px" }}>
            <h3 style={{ background: "none", fontFamily: "Poppins" }}>{repo.name}</h3>
            <p style={{ background: "none", fontFamily: "Poppins" }}>{repo.description}</p>
            <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ background: "none", fontFamily: "Poppins" }}>
              <button type="button" className="loginButton" style={{ marginLeft: "10px", marginTop: "20px" }}>
                Contribute
              </button>
            </a>

          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
