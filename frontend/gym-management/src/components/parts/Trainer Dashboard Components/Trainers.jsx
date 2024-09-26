import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTrainers } from '../../api/api';
import { Alert } from 'react-bootstrap';

const Trainers = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trainers, setTrainers] = useState([]);


    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const trainersResponse = await getAllTrainers();
                setTrainers(trainersResponse.data);
            } catch (error) {
                setError('Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
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


    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>Trainers</h5>
                    <Link to="/manage-trainers" className="btn btn-primary btn-sm">View All</Link>
                </div>
                <div className="card-body">
                    {trainers && trainers.length > 0 ? (
                        <ul className="list-group">
                            {trainers.slice(0, 2).map((trainer, index) => (
                                <li key={index} className="list-group-item">
                                    <p><strong>Name:</strong> {trainer.user.firstName} {trainer.user.lastName}</p>
                                    <p><strong>Email:</strong> {trainer.user.email}</p>
                                    <p><strong>Status:</strong> {trainer.status.statusType}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="alert alert-primary" role="alert">
                            No Trainers Available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Trainers;