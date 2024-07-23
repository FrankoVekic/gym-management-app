import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ChartsCarouselComponent from '../parts/Trainer Dashboard Components/ChartsCarouselComponent';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientStatusTable from '../parts/Trainer Dashboard Components/ClientStatusTable';
import StatsCards from '../parts/Trainer Dashboard Components/StatsCards';
import UpcomingSessions from '../parts/Trainer Dashboard Components/UpcomingSessions';
import { getMemberStatusesAndTrainingPackages } from '../api/api';

const TrainerDashboard = () => {
    const [membersData, setMembersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembersData = async () => {
            try {
                const response = await getMemberStatusesAndTrainingPackages();
                setMembersData(response.data);
            } catch (error) {
                setError('Failed to fetch members data.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembersData();
    }, []);

    const notifications = [
        {
            id: 1,
            message: 'Session with John Doe has been rescheduled.',
            date: '2024-07-18',
        },
        {
            id: 2,
            message: 'Happy Birthday to Jane Smith!',
            date: '2024-07-19',
        },
    ];

    const resources = [
        {
            id: 1,
            title: 'How to Improve Client Retention',
            link: '/resources/client-retention',
        },
        {
            id: 2,
            title: 'Top 10 Exercises for Core Strength',
            link: '/resources/core-strength',
        },
    ];

    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstname' },
        { Header: 'Last Name', accessor: 'lastname' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Training Package', accessor: 'trainingPackage' }
    ], []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <StatsCards />
            <div className="row mb-4">
                <div className="col-md-12">
                    <ClientStatusTable columns={columns} data={membersData} />
                </div>
            </div>
            <UpcomingSessions />

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Notifications</h5>
                            <Link to="/notifications" className="btn btn-primary btn-sm">View All</Link>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {notifications.map(notification => (
                                    <li key={notification.id} className="list-group-item">
                                        <p>{notification.message}</p>
                                        <p className="text-muted"><small>{notification.date}</small></p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Resources for Trainers</h5>
                            <Link to="/resources" className="btn btn-primary btn-sm">View All</Link>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {resources.map(resource => (
                                    <li key={resource.id} className="list-group-item">
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                            {resource.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <ChartsCarouselComponent />
            </div>
        </div>
    );
};

export default TrainerDashboard;
