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

export default function GymApp() {
    return (
    //    <AuthProvider>
            <BrowserRouter>
            <AuthProvider>
                <div className="GymApp">
                    <HeaderComponent />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomeComponent />} />
                            <Route path="/login" element={<LoginComponent />} />
                            <Route path="/register" element={<RegisterComponent />} />
                            <Route path="/about" element={<AboutComponent/>} />
                            <Route path="contact" element={<ContactComponent />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </div>
                    <FooterComponent />
                </div>
                </AuthProvider>
            </BrowserRouter>
     //   
    );
}