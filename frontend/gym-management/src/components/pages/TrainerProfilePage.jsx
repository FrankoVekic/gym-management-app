import React from "react";
import TrainerProfileCard from "../parts/Trainer Profile Page Components/TrainerProfileCard";
import TrainerOverview from "../parts/Trainer Profile Page Components/TrainerOverview";
import TrainerProfileContent from "../parts/Trainer Profile Page Components/TrainerProfileContent";
import TrainerProfileNavbar from "../parts/Trainer Profile Page Components/TrainerProfileNavbar";
import ChangePasswordForm from "../parts/Profile Page Components/ChangePasswordForm";

const TrainerProfilePage = () => {
    return (
        <div className="container mt-5">
            <section className="bg-light py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row gy-4 gy-lg-0">
                        <TrainerProfileCard />
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <TrainerProfileNavbar />
                                    <div className="tab-content pt-4" id="profileTabContent">
                                        <TrainerOverview />
                                        <TrainerProfileContent />
                                        <ChangePasswordForm/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TrainerProfilePage;
