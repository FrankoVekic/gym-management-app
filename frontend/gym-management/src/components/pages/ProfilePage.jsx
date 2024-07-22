import React from "react";
import ProfileContent from "../parts/Profile Page Components/ProfileContent";
import Overview from "../parts/Profile Page Components/OverView";
import ChangePasswordForm from "../parts/Profile Page Components/ChangePasswordForm";
import ProfileNavbar from "../parts/Profile Page Components/ProfileNavbar";


const ProfilePage = () => {

    return (
        <div className="container mt-5">
            <section className="bg-light py-3 py-md-5 py-xl-8">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                            <h2 className="mb-4 display-5 text-center">Profile</h2>
                            <p className="text-secondary text-center lead fs-4 mb-5">
                                The Profile page is your digital hub, where you can fine-tune your
                                experience. Here's a closer look at the settings you can expect to
                                find in your profile page.
                            </p>
                            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row gy-4 gy-lg-0">
                        <div className="col-12 col-lg-4 col-xl-3">
                            <div className="row gy-4">
                                <div className="col-12">
                                    <div className="card widget-card border-light shadow-sm">
                                        <div className="card-header text-bg-primary">
                                            Welcome, Firstname Lastname
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center mb-3">
                                                <img
                                                    src="./assets/img/profile-img-1.jpg"
                                                    className="img-fluid rounded-circle"
                                                    alt="Luna John"
                                                />
                                            </div>
                                            <h5 className="text-center mb-1">Firstname Lastname</h5>
                                            <p className="text-center text-secondary mb-4">
                                                Role
                                            </p>
                                            <ul className="list-group list-group-flush mb-4">
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <h6 className="m-0">Status</h6>
                                                    <span></span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <h6 className="m-0">Joined Date</h6>
                                                    <span></span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <h6 className="m-0">Training Type </h6>
                                                    <span></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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