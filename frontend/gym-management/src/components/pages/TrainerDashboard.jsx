import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientStatusTable from '../parts/Trainer Dashboard Components/ClientStatusTable';
import StatsCards from '../parts/Trainer Dashboard Components/StatsCards';
import UpcomingSessions from '../parts/Trainer Dashboard Components/UpcomingSessions';
import { getAllContactEntries } from '../api/api';
import { Alert, Spinner } from 'react-bootstrap';

const TrainerDashboard = () => {
    const [contactEntries, setContactEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContactEntries = async () => {
            try {
                const response = await getAllContactEntries();
                setContactEntries(response.data.slice(0, 2));
            } catch (error) {
                setError('Failed to fetch contact entries.');
            } finally {
                setLoading(false);
            }
        };

        fetchContactEntries();
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
        <div className="container mt-5">
            <StatsCards />
            <div className="row mb-4">
                <div className="col-md-12">
                    <ClientStatusTable />
                </div>
            </div>
            <UpcomingSessions />

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Contact Entries</h5>
                            <Link to="/contact-entries" className="btn btn-primary btn-sm">View All</Link>
                        </div>
                        <div className="card-body">
                            {contactEntries && contactEntries.length > 0 ? (
                                <ul className="list-group">
                                    {contactEntries.map((entry, index) => (
                                        <li key={index} className="list-group-item">
                                            <p><strong>Name:</strong> {entry.fullName}</p>
                                            <p><strong>Email:</strong> {entry.email}</p>
                                            <p><strong>Phone number:</strong> {entry.phoneNumber}</p>
                                            <p><strong>Message:</strong> {entry.message.length > 50 ? entry.message.substring(0, 50) + '...' : entry.message}</p>
                                            <p><strong>Created:</strong> {new Date(entry.createdAt).toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="alert alert-primary" role="alert">
                                    No Contact Entries Yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
