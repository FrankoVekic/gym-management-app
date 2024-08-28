import React, { useRef, useState, useEffect } from 'react';
import { getFilteredBlogs, getSearchedBlogs } from '../../api/api';
import { Link } from 'react-router-dom';
import Statics from '../../static utils/Statics';

const Forum = () => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchText, setSearchText] = useState("");

    const fetchBlogs = async () => {
        try {
            let response;
            if (searchText) {
                response = await getSearchedBlogs(searchText);
            } else {
                response = await getFilteredBlogs(filter);
            }
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [filter, searchText]);

    const forumRef = useRef(null);

    useEffect(() => {
        if (forumRef.current) {
            forumRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const isActive = (currentFilter) =>
        filter === currentFilter ? "active" : "";

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
                                                        <button
                                                            className={`nav-link nav-link-faded ${isActive("")}`}
                                                            onClick={() => handleFilterChange("")}
                                                        >
                                                            All Discussions
                                                        </button>
                                                        <button
                                                            className={`nav-link nav-link-faded ${isActive("lastWeek")}`}
                                                            onClick={() => handleFilterChange("lastWeek")}
                                                        >
                                                            From Last Week
                                                        </button>
                                                        <button
                                                            className={`nav-link nav-link-faded ${isActive("lastMonth")}`}
                                                            onClick={() => handleFilterChange("lastMonth")}
                                                        >
                                                            From Last Month
                                                        </button>
                                                        <button
                                                            className={`nav-link nav-link-faded ${isActive("mostComments")}`}
                                                            onClick={() => handleFilterChange("mostComments")}
                                                        >
                                                            Most Commented
                                                        </button>
                                                        <button
                                                            className={`nav-link nav-link-faded ${isActive("leastComments")}`}
                                                            onClick={() => handleFilterChange("leastComments")}
                                                        >
                                                            Least Commented
                                                        </button>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="forum" ref={forumRef} className="inner-main">
                        <div className="inner-main-header d-flex align-items-center">
                            <div className="input-group rounded">
                                <input type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="form-control rounded" placeholder="Search" />
                            </div>
                        </div>
                        <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                            {blogs.map(blog => {

                                const activeCommentsCount = blog.comments.filter(comment => comment.deletedAt === null).length;

                                return (
                                    <div className="card mb-2" key={blog.id}>
                                        <div className="card-body p-2 p-sm-3">
                                            <div className="media forum-item">
                                                <Link to={`/blogs/${blog.id}`} data-toggle="collapse" data-target=".forum-content">
                                                    <div
                                                        className="avatar-wrapper"
                                                        style={{
                                                            backgroundImage: `${blog.author.image ? `url(${Statics.imagesUsersLogoUrl}${blog.author.image})` : `url(${Statics.noImageUrl})`}`,
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
                                                        <span className="text-secondary"> {new Date(blog.createdAt).toLocaleString(undefined, {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}</span>
                                                    </p>
                                                </div>
                                                <div className="text-muted small text-center align-self-center">
                                                    <Link to={`/blogs/${blog.id}`}>
                                                        <i className="far fa-comment ml-2"></i> {activeCommentsCount} Comments
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forum;
