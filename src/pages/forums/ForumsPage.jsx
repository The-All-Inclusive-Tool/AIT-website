import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from '../../components/navbar/Navbar';
import './forumspage.css';

const ForumsPage = () => {
    const editorRef = useRef(null);
    const [isExtended, setExtended] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newForum, setNewForum] = useState('');

    const logContent = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const toggleExtended = () => {
        setExtended(!isExtended);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handlePostComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { id: comments.length + 1, text: newComment }]);
            setNewComment('');
        }
    };

    const handleShowEditor = () => {
        setShowEditor(true);
    };

    const handlePostForum = () => {
        if (newForum.trim() !== '') {
            // Handle posting a new forum
            setNewForum('');
            setShowEditor(false); // Hide the editor after posting a new forum
        }
    };

    return (
        <>
            <Navbar />
            <div className="ForumsPage">
                <center>
                    <h2 style={{ fontSize: '32px', fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: '20px', color: '#643843' }}>
                        Welcome to the Forums
                    </h2>
                    <button type="button" className="postButton" onClick={handleShowEditor} style={{ backgroundColor: '#85586F', color: '#FDF0D1' }}>
                        + Post New Forum
                    </button>
                    {showEditor && (
                        <Editor
                            apiKey='ag1cghftdtqz0evvgohhol8lm6p4qnomvmpp1c98vlg7avuh'
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            initialValue="<p>Start a new discussion...</p>"
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                ],
                                toolbar:
                                    'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #643843 }',
                            }}
                        />
                    )}
                    {showEditor && (
                        <button type="button" className="postButton" onClick={handlePostForum} style={{ backgroundColor: '#85586F', color: '#FDF0D1', marginTop: '10px' }}>
                            Post Forum
                        </button>
                    )}
                    <div className={`topic-container ${isExtended ? 'extended' : ''}`}>
                        <div className="topic-header" onClick={toggleExtended}>
                            <span className="topic-title">Random Topic Title</span>
                            <span className="arrow">{isExtended ? '▲' : '▼'}</span>
                        </div>
                        {isExtended && (
                            <div className="topic-content">
                                <p className="topic-description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                                </p>
                                <ul className="comment-list">
                                    {comments.map((comment) => (
                                        <li key={comment.id} className="comment-item">
                                            {comment.text}
                                        </li>
                                    ))}
                                </ul>
                                <div className="comment-box">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={handleCommentChange}
                                        placeholder="Add a comment..."
                                        style={{ borderColor: '#AC7D88' }}
                                    />
                                    <button type="button" onClick={handlePostComment}>
                                        Post
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </center>
            </div>
        </>
    );
};

export default ForumsPage;
