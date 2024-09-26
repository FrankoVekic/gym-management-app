import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientStatusTable from '../parts/Trainer Dashboard Components/ClientStatusTable';
import StatsCards from '../parts/Trainer Dashboard Components/StatsCards';
import UpcomingSessions from '../parts/Trainer Dashboard Components/UpcomingSessions';
import ContactEntries from '../parts/Trainer Dashboard Components/ContactEntries';
import Trainers from '../parts/Trainer Dashboard Components/Trainers';


const TrainerDashboard = () => {


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
                <ContactEntries />
                <Trainers/>
            </div>
        </div>
    );
};

export default TrainerDashboard;
