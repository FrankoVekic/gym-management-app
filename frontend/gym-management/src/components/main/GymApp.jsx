import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from '../pages/LoginComponent';
import HeaderComponent from '../parts/HeaderComponent';
import HomeComponent from '../pages/HomeComponent';
import FooterComponent from '../parts/FooterComponent';
import ErrorComponent from '../parts/ErrorComponent';
import { AuthProvider } from '../context/AuthContext';
import AboutComponent from '../pages/AboutComponent';
import ContactComponent from '../pages/ContactComponent';
import RegisterComponent from '../pages/RegisterComponent';
import ForgotPasswordComponent from '../pages/ForgotPasswordComponent';
import ResetPasswordComponent from '../pages/ResetPasswordComponent';
import TrainingPackagesComponent from '../pages/TrainingPackagesComponent';
import TrainingPackageDetailComponent from '../parts/Training Package Components/TrainingPackageDetailComponent';
import BlogComponent from '../pages/BlogComponent';
import BlogDetail from '../parts/Blog Page Components/BlogDetail';
import BlogCreation from '../parts/Blog Page Components/BlogCreation';
import ManageComponent from '../pages/ManageComponent';
import ProfilePage from '../pages/ProfilePage';
import TrainerDashboard from '../pages/TrainerDashboard';
import MemberProtectedRoute from '../protected routes/MemberProtectedRoute';
import ProtectedRoute from '../protected routes/ProtectedRoute';
import TrainerProtectedRoute from '../protected routes/TrainerProtectedRoute';
import AuthenticatedRoute from '../protected routes/AuthenticatedRoute';


export default function GymApp() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="GymApp">
                    <HeaderComponent />
                    <div className="content">
                        <Routes>

                            {/* PROTECTED ROUTES WHEN LOGGED IN */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/login" element={<LoginComponent />} />
                                <Route path="/reset-password" element={<ResetPasswordComponent />} />
                                <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
                                <Route path="/register" element={<RegisterComponent />} />
                            </Route>

                            {/* TRAINER ROUTES */}
                            <Route element={<TrainerProtectedRoute />}>
                                <Route path="trainer-dashboard" element={<TrainerDashboard />} />
                                <Route path="/trainer-management" element={<ManageComponent />} />
                            </Route>

                            {/* ROUTES FOR ALL AUTHENTICATED USERS */}
                            <Route element={<AuthenticatedRoute />}>
                                <Route path="/blogs" element={<BlogComponent />} />
                                <Route path="/blogs/:id" element={<BlogDetail />} />
                                <Route path="/blogs/new-discussion" element={<BlogCreation />} />
                                <Route path="/training-packages" element={<TrainingPackagesComponent />} />
                                <Route path="/training-package-detail/:id" element={<TrainingPackageDetailComponent />} />
                                <Route path="/profile-page" element={<ProfilePage />} />
                            </Route>


                            {/* MEMBER ROUTES */}
                            <Route element={<MemberProtectedRoute />}>
                                <Route path="/about" element={<AboutComponent />} />
                                <Route path="/contact" element={<ContactComponent />} />
                            </Route>

                            <Route path="/" element={<HomeComponent />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </div>
                    <FooterComponent />
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}