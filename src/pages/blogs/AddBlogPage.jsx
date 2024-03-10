import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './addblogpage.css';
import { useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';

const AddBlogForm = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');

    const editorRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server to store the blog
            const response = await fetch('http://localhost:5000/store-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: blogTitle,
                    content: editorRef.current.getContent(),
                    author: blogAuthor,
                }),
            });

            if (response.ok) {
                console.log('Blog successfully uploaded!');
                // You can add logic to redirect or handle success
            } else {
                console.error('Failed to upload blog.');
            }
        } catch (error) {
            console.error('Error uploading blog:', error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="add-blog-form-container" style={{ background: "#AC7D88" }}>
                <h2 className="form-header" style={{ background: "none", fontFamily: "poppins", color: "white" }}>Add a New Blog</h2>
                <form onSubmit={handleSubmit} className="blog-form" style={{ background: "none" }}>
                    <div className="form-group" style={{ background: "none" }}>
                        <label htmlFor="blogTitle" style={{ background: "none", color: "white" }}>Title:</label>
                        <input
                            type="text"
                            id="blogTitle"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ background: "none" }}>
                        <label htmlFor="blogContent" style={{ background: "none", color: "white" }}>Content:</label>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            onChange={(e) => setBlogContent(e.target.value)}
                            apiKey='ag1cghftdtqz0evvgohhol8lm6p4qnomvmpp1c98vlg7avuh'
                            init={{
                                onChange: (e) => setBlogContent(e.target.getContent()),

                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            initialValue="Enter your blog content"
                        />
                    </div>
                    <div className="form-group" style={{ background: "none" }}>
                        <label htmlFor="blogAuthor" style={{ background: "none", color: "white" }}>By:</label>
                        <input
                            type="text"
                            id="blogAuthor"
                            value={blogAuthor}
                            onChange={(e) => setBlogAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBlogForm;
