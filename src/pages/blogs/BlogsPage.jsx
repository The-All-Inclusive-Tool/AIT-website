import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './blogspage.css';
import { Link } from 'react-router-dom';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Function to fetch blogs from the server
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/get-all-blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };

        // Call the fetchBlogs function
        fetchBlogs();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="header" style={{ marginRight: '30px' }}>Explore Blogs</h1>

                <div className="blog-container">
                    {blogs.map(blog => (
                        <div key={blog._id} className="blog-card" style={{ border: '2px solid black' }}>
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-content">{blog.content.slice(0, 100)}...</p>
                            <p className="blog-author">By: {blog.author}</p>
                        </div>
                    ))}
                </div>

                <Link to="/add-blog"><button className="add-blog-btn">Add Blog</button></Link>
            </div>
        </>
    );
};

export default BlogsPage;
