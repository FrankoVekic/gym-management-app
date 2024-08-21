import React, { useState, useEffect } from 'react';
import { getMembersCount, getTraningSessionsCount, getTotalPaid } from '../../api/api';
import { Alert, Spinner } from 'react-bootstrap';


const StatsCards = () => {
    const [totalClients, setTotalClients] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalPaid, setTotalPaid] = useState(7800);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const clientResponse = await getMembersCount();
                setTotalClients(clientResponse.data);

                const sessionsResponse = await getTraningSessionsCount();
                setTotalSessions(sessionsResponse.data);

                const totalPaidResponse = await getTotalPaid();
                setTotalPaid(totalPaidResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const stats = {
        totalClients,
        totalSessions,
        totalPaid,
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


    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">
                        <i className="fas fa-users"></i> Total Clients
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{stats.totalClients}</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                        <i className="fas fa-calendar-check"></i> Total Sessions
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{stats.totalSessions}</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-white bg-warning mb-3">
                    <div className="card-header">
                        <i className="fas fa-dollar-sign"></i> Total Earnings
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">${stats.totalPaid}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
