import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../../api/api';
import { Link } from 'react-router-dom';
import Statics from '../../static utils/Statics';

const Forum = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getAllBlogs();
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="container forumBody mt-5">
            <div className="main-body p-0">
                <div className="inner-wrapper">
                    <div className="inner-sidebar">
                        <div className="inner-sidebar-header justify-content-center">
                            <Link
                                to='new-discussion'
                                className="btn btn-primary"
                                type="button">
                                NEW DISCUSSION
                            </Link>
                        </div>
                        <div className="inner-sidebar-body p-0">
                            <div className="p-3 h-100" data-simplebar="init">
                                <div className="simplebar-wrapper" style={{ margin: '-16px' }}>
                                    <div className="simplebar-height-auto-observer-wrapper">
                                        <div className="simplebar-height-auto-observer"></div>
                                    </div>
                                    <div className="simplebar-mask">
                                        <div className="simplebar-offset">
                                            <div
                                                className="simplebar-content-wrapper"
                                                style={{ height: '100%', overflow: 'hidden scroll' }}
                                            >
                                                <div className="simplebar-content" style={{ padding: '16px' }}>
                                                    <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                                        <a href="" className="nav-link nav-link-faded">
                                                            All Discussions
                                                        </a>
                                                        <a href="" className="nav-link nav-link-faded">
                                                            From This Week
                                                        </a>
                                                        <a href="" className="nav-link nav-link-faded">
                                                            From This Month
                                                        </a>
                                                        <a href="" className="nav-link nav-link-faded">
                                                            Most Commented
                                                        </a>
                                                        <a href="" className="nav-link nav-link-faded">
                                                            No Replies Yet
                                                        </a>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="inner-main">
                        <div className="inner-main-header d-flex align-items-center">
                            <span className="input-icon input-icon-sm ml-auto w-auto">
                                <input
                                    type="text"
                                    className="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4"
                                    placeholder="Search forum"
                                />
                            </span>
                        </div>
                        <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                            {blogs.map(blog => (
                                <div className="card mb-2" key={blog.id}>
                                    <div className="card-body p-2 p-sm-3">
                                        <div className="media forum-item">
                                            <Link to={`/blogs/${blog.id}`} data-toggle="collapse" data-target=".forum-content">
                                                <div
                                                    className="avatar-wrapper"
                                                    style={{
                                                        backgroundImage: `url(${Statics.imagesUsersLogoUrl}${blog.author.image})`,
                                                        width: "60px",
                                                        height: "60px",
                                                        backgroundPosition: "center",
                                                        backgroundSize: "cover",
                                                        borderRadius: "50%",
                                                        overflow: "hidden",
                                                    }}
                                                ></div>
                                            </Link>
                                            <div className="media-body">
                                                <h6>
                                                    <Link to={`/blogs/${blog.id}`} className="text-body">
                                                        <h5>{blog.title}</h5>
                                                    </Link>
                                                </h6>
                                                <p className="text-secondary">
                                                    {blog.content}
                                                </p>
                                                <p className="text-muted">
                                                    <a href="">{`${blog.author.firstName} ${blog.author.lastName}`}</a>
                                                    <span className="text-secondary"> {new Date(blog.createdAt).toLocaleString()}</span>
                                                </p>
                                            </div>
                                            <div className="text-muted small text-center align-self-center">
                                                <Link to={`/blogs/${blog.id}`}>
                                                    <i className="far fa-comment ml-2"></i> {blog.comments.length} Comments
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
