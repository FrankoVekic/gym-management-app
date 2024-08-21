import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentTestimonials from './RecentTestimonials';
import { getUpcomingTrainingSessions } from '../../api/api';
import { Alert, Spinner } from 'react-bootstrap';


const UpcomingSessions = () => {
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcomingSessions = async () => {
            try {
                const response = await getUpcomingTrainingSessions();
                setUpcomingSessions(response.data);
            } catch (error) {
                setError('Failed to fetch upcoming training sessions.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingSessions();
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

    const sessionsToDisplay = upcomingSessions.slice(0, 2);

    return (
        <div className="row mb-4">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5>Upcoming Sessions</h5>
                        <Link to="/training-sessions" className="btn btn-primary btn-sm">View All</Link>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {sessionsToDisplay.map(session => (
                                <li key={session.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-1"><strong>Training Type:</strong> {session.trainingType}</p>
                                        <p className="mb-1"><strong>Trainer:</strong> {session.trainer}</p>
                                        <p className="mb-1"><strong>Date:</strong> {new Date(session.sessionDate).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                        <p className="mb-1"><strong>Number of Members:</strong> {session.numberOfPeople}</p>
                                    </div>
                                    <i className="fas fa-chevron-right"></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <RecentTestimonials />
        </div>
    );
};

export default UpcomingSessions;
