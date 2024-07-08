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

export default function GymApp() {
    return (
            <BrowserRouter>
            <AuthProvider>
                <div className="GymApp">
                    <HeaderComponent />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomeComponent />} />
                            <Route path="/login" element={<LoginComponent />} />
                            <Route path="/register" element={<RegisterComponent />} />
                            <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
                            <Route path="/reset-password" element={<ResetPasswordComponent/>} />
                            <Route path="/blogs" element={<BlogComponent/>} />
                            <Route path="/blogs/:id" element={<BlogDetail/>} />
                            <Route path="/training-packages" element={<TrainingPackagesComponent/>} />
                            <Route path="/training-package-detail/:id" element={<TrainingPackageDetailComponent/>} />
                            <Route path="/about" element={<AboutComponent/>} />
                            <Route path="contact" element={<ContactComponent />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </div>
                    <FooterComponent />
                </div>
                </AuthProvider>
            </BrowserRouter>  
    );
}