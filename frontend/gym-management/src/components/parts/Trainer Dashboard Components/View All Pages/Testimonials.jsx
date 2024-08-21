import React, { useEffect, useState } from "react";
import { getTestimonialUsers } from '../../../api/api';
import { Alert, Spinner } from 'react-bootstrap';


// TODO: ADD PAGINATION
// TODO: CHANGE DESIGN (TABLE MAYBE)

const Testimonials = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getTestimonialUsers();
                setFeedback(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
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
        <div className="recent-testimonials-container">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>All Testimonials</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {feedback.map(item => (
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

export default Testimonials;
