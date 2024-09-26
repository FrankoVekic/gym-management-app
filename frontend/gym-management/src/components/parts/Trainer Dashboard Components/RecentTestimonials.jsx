import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTestimonialUsers } from "../../api/api";
import { Alert } from 'react-bootstrap';


const RecentTestimonials = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getTestimonialUsers();
                setFeedback(response.data);
            } catch (error) {
                setError('Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <span className="visually-hidden">Loading...</span>
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

    const limitedFeedback = feedback.slice(0, 5);

    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>Recent Testimonials</h5>
                    <Link to="/testimonials" className="btn btn-primary btn-sm">View All</Link>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {limitedFeedback.map(item => (
                            <li key={item.id} className="list-group-item">
                                <p><strong>{item.user.firstName}:</strong> {item.testimonials.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecentTestimonials;
