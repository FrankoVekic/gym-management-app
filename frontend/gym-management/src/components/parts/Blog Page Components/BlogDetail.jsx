import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../api/api';
import { Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { addCommentToBlog } from '../../api/api';
import { jwtDecode } from 'jwt-decode';
import URLSaver from '../URLSaver';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const commentsPerPage = 3;
    const { authState } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    

    useEffect(() => {

        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                setBlog(response.data);
                setComments(response.data.comments || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError('Error fetching blog. Please try again later.');
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);


    // TODO: IMPLEMENT ADDING COMMENT WHEN USER IS LOGGED IN
    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        const commentData = {
            content: newComment,
            blog: { id: id },
            user: {
                id: authState.user.userID,
            }
        };

        try {
            const response = await addCommentToBlog(commentData);
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };


    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div className='mb-3'>

            <div className="blog-detail-container mt-5">
                <div className="blog-header d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start mb-3">
                        <URLSaver />
                    </div>
                    <div className="d-flex justify-content-end mb-3">
                        {blog.author.id === decodedToken.userID && (
                            <>
                                <button className="btn btn-success me-2"><i className="bi bi-pen"></i> Update</button>
                                <button className="btn btn-danger"><i className="bi bi-trash"></i> Delete</button>
                            </>
                        )}
                    </div>
                </div>
                <h1 className="blog-title">{blog.title}</h1>
                <p className="blog-meta">
                    By <span className="blog-author">{`${blog.author.firstName} ${blog.author.lastName + " "}`}</span>
                    on <span className="blog-date">{new Date(blog.createdAt).toLocaleString()}</span>
                </p>
                <div className="blog-content">
                    <p>{blog.content}</p>
                </div>
                <div className="comments-section">
                    <h3>Comments</h3>
                    {currentComments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                        currentComments.map(comment => (
                            <div key={comment.id} className="comment">
                                <p className="comment-content">{comment.content}</p>
                                <p className="comment-meta">
                                    By <span className="comment-author">{`${comment.user.firstName} ${comment.user.lastName + " "}`}</span>
                                    on <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
                                </p>
                            </div>
                        ))
                    )}

                    {/* TODO: Change pagination counter */}
                    <div className="pagination justify-content-center align-items-center">
                        {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, i) => (
                            <button key={i + 1} onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className="add-comment-section mt-2">
                        <h4>Add a Comment</h4>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."></textarea>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleAddComment}>
                            Add Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
