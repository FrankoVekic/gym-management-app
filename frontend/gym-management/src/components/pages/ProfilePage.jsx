import React from "react";
import ProfileContent from "../parts/Profile Page Components/ProfileContent";
import Overview from "../parts/Profile Page Components/OverView";
import ChangePasswordForm from "../parts/Profile Page Components/ChangePasswordForm";
import ProfileNavbar from "../parts/Profile Page Components/ProfileNavbar";
import ProfileCard from "../parts/Profile Page Components/ProfileCard";


const ProfilePage = () => {

    return (
        <div className="container mt-5">
            <section className="bg-light py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row gy-4 gy-lg-0">
                       <ProfileCard/>
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <ProfileNavbar/>
                                    <div className="tab-content pt-4" id="profileTabContent">
                                        <Overview />
                                        <ProfileContent />
                                        <ChangePasswordForm />
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


export default ProfilePage