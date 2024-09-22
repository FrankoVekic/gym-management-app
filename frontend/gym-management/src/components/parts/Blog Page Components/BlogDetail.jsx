import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog, deleteBlog, addCommentToBlog, updateComment, deleteComment } from "../../api/api";
import { Spinner, Alert, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import URLSaver from "../URLSaver";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({ title: "", content: "" });
    const [commentErrors, setCommentErrors] = useState("");
    const commentsPerPage = 3;
    const { authState } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;

    const activeComments = comments.filter(comment => comment.deletedAt === null);
    const currentComments = activeComments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [isEditingBlog, setIsEditingBlog] = useState(false);
    const [editedBlog, setEditedBlog] = useState({ title: "", content: "" });
    const [newCommentErrors, setNewCommentErrors] = useState("");

    const [isEditingCommentId, setIsEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                setBlog(response.data);
                setComments(response.data.comments || []);
                setLoading(false);
            } catch (error) {
                setError("Error fetching blog. Please try again later.");
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const validateBlog = () => {
        let errors = { title: "", content: "" };

        if (!editedBlog.title.trim()) {
            errors.title = 'Title is required';
        } else if (editedBlog.title.length < 3) {
            errors.title = 'Title is too short';
        } else if (editedBlog.title.length > 150) {
            errors.title = 'Title is too long';
        } else if (!/[a-zA-Z]/.test(editedBlog.title)) {
            errors.title = 'Invalid input, try writing something else';
        }

        
        if (!editedBlog.content.trim()) {
            errors.content = 'Content is required';
        } else if (editedBlog.content.length < 10) {
            errors.content = 'Content is too short';
        } else if (editedBlog.content.length > 4500) {
            errors.content = 'Content is too large, text must be shorter';
        }

        setFormErrors(errors);

        return !errors.title && !errors.content;
    };

    const validateComment = () => {
        let error = "";

        if (editedCommentContent.trim() === "") {
            error = "Comment cannot be empty.";
        } else if (editedCommentContent.length > 600) {
            error = "Comment is too long, remove some text before saving";
        }

        setCommentErrors(error);
        return !error;
    };

    const validateNewComment = () => {
        let error = "";
    
        if (newComment.trim() === "") {
            error = "Comment cannot be empty.";
        } else if (newComment.length > 600) {
            error = "Comment is too long, remove some text before posting";
        }
    
        setNewCommentErrors(error);
        return !error;
    };
    

    const handleDeleteBlog = async () => {
            setShowMessage(true);
            try {
                await deleteBlog(id);
                setTimeout(() => {
                    navigate("/blogs");
                }, 2000);
            } catch (error) {
                setError("Error while deleting blog. Please try again later.");
            }
    };

    const handleAddComment = async () => {
        if (validateNewComment()) {
            const commentData = {
                content: newComment,
                blog: { id: id },
                user: { id: authState.user.userID },
            };
            try {
                const response = await addCommentToBlog(commentData);
                setComments(prevComments => [response.data, ...prevComments]);
                setNewComment("");
                setCurrentPage(1);
                setNewCommentErrors("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };
    

    const handleEditBlog = async () => {
        if (isEditingBlog) {
            if (validateBlog()) {
                try {
                    await updateBlog({
                        id: blog.id,
                        title: editedBlog.title,
                        content: editedBlog.content,
                    });
                    setBlog({
                        ...blog,
                        title: editedBlog.title,
                        content: editedBlog.content,
                    });
                    setIsEditingBlog(false);
                } catch (error) {
                    setError("Error updating blog. Please try again later.");
                }
            }
        } else {
            setEditedBlog({ title: blog.title, content: blog.content });
            setIsEditingBlog(true);
        }
    };

    const handleEditComment = async (comment) => {
        if (isEditingCommentId === comment.id) {
            if (validateComment()) {
                const commentUpdateData = {
                    commentId: comment.id,
                    content: editedCommentContent,
                    blogId: blog.id,
                    userId: decodedToken.userID,
                };

                try {
                    await updateComment(commentUpdateData);
                    setComments(prevComments =>
                        prevComments.map(c =>
                            c.id === comment.id ? { ...c, content: editedCommentContent } : c
                        )
                    );

                    setIsEditingCommentId(null);
                    setEditedCommentContent("");
                    setCommentErrors("");
                } catch (error) {
                    setError("Error updating comment. Please try again later.");
                }
            }
        } else {
            setIsEditingCommentId(comment.id);
            setEditedCommentContent(comment.content);
            setCommentErrors("");
        }
    };

    const handleDeleteComment = async (commentId) => {
            await deleteComment(commentId);

            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);

            const activeComments = updatedComments.filter(comment => comment.deletedAt === null);

            const totalPages = Math.ceil(activeComments.length / commentsPerPage);
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            }
    };

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

    if (showMessage) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Alert variant="success">Blog was successfully deleted.</Alert>
            </div>
        );
    }

    return (
        <div className="mb-3">
            <div className="blog-detail-container mt-5">
                <div className="blog-header d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start mb-3">
                        <URLSaver />
                    </div>
                    <div className="d-flex justify-content-end mb-3">
                        {blog.author.id === decodedToken.userID && (
                            <>
                                <Button className="btn btn-success me-2" onClick={handleEditBlog}>
                                    {!isEditingBlog ? <i className="bi bi-pen"></i> : "Save"}
                                </Button>
                                <Button className="btn btn-danger" onClick={handleDeleteBlog}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                {isEditingBlog ? (
                    <>
                        <input
                            type="text"
                            value={editedBlog.title}
                            onChange={(e) =>
                                setEditedBlog({ ...editedBlog, title: e.target.value })
                            }
                            style={{ width: "100%", padding: "5px" }}
                        />
                        {formErrors.title && <Alert variant="danger">{formErrors.title}</Alert>}
                    </>
                ) : (
                    <div className="blog-title-container">
                        <h1 className="blog-title">{blog.title}</h1>
                    </div>

                )}
                <p className="blog-meta">
                    By
                    <span className="blog-author">{` ${blog.author.firstName} ${blog.author.lastName + " "}`}</span>
                    on
                    <span className="blog-date">
                        {" " + new Date(blog.createdAt).toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </p>
                <div className="blog-content m-5">
                    {isEditingBlog ? (
                        <>
                            <textarea
                                value={editedBlog.content}
                                onChange={(e) =>
                                    setEditedBlog({ ...editedBlog, content: e.target.value })
                                }
                                style={{ width: "100%", padding: "5px", height: "300px" }}
                            ></textarea>
                            {formErrors.content && <Alert variant="danger">{formErrors.content}</Alert>}
                        </>
                    ) : (
                        <p>{blog.content}</p>
                    )}
                </div>
                <div className="comments-section">
                    <h3>Comments:</h3>
                    {activeComments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                        currentComments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <div className="d-flex justify-content-end mb-3">
                                    {comment.user.id === decodedToken.userID && (
                                        <>
                                            <Button className="btn btn-success me-1 commentBtn" onClick={() => handleEditComment(comment)}>
                                                {isEditingCommentId === comment.id ? "Save" : <i className="bi bi-pen"></i>}
                                            </Button>
                                            <Button className="btn btn-danger commentBtn" onClick={() => handleDeleteComment(comment.id)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </>
                                    )}
                                </div>
                                {isEditingCommentId === comment.id ? (
                                    <>
                                      <textarea
                                        className="mb-2"
                                        value={editedCommentContent}
                                        onChange={(e) => setEditedCommentContent(e.target.value)}
                                        style={{ width: "100%", padding: "5px", height: "100px" }}
                                    />
                                    {commentErrors && <Alert variant="danger">{commentErrors}</Alert>}
                                    </>
                                  
                                ) : (
                                    <p className="comment-content">{comment.content}</p>
                                )}
                                <p className="comment-meta">
                                    By
                                    <span className="comment-author">{` ${comment.user.firstName} ${comment.user.lastName + " "}`}</span>
                                    on
                                    <span className="comment-date">
                                        {" " + new Date(comment.createdAt).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </p>
                            </div>
                        ))
                    )}
                    <div className="pagination justify-content-center align-items-center">
                        {Array.from(
                            { length: Math.ceil(activeComments.length / commentsPerPage) },
                            (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`page-link ${currentPage === i + 1 ? "active" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ),
                        )}
                    </div>
                    <div className="add-comment-section mt-2">
                        <h4>Add a Comment</h4>
                        <textarea
                            className="form-control mb-2"
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                        ></textarea>
                        {newCommentErrors && <Alert variant="danger">{newCommentErrors}</Alert>}
                        <Button className="btn btn-primary mt-2" onClick={handleAddComment}>
                            Add Comment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
