import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from '../pages/LoginComponent';
import HeaderComponent from '../parts/HeaderComponent';
import HomeComponent from '../pages/HomeComponent';
import FooterComponent from '../parts/FooterComponent';
import ErrorComponent from '../parts/ErrorComponent';
//import { AuthProvider } from '../context/AuthContext';
import AboutComponent from '../pages/AboutComponent';
import ContactComponent from '../pages/ContactComponent';

export default function GymApp() {
    return (
    //    <AuthProvider>
            <BrowserRouter>
                <div className="GymApp">
                    <HeaderComponent />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomeComponent />} />
                            <Route path="/login" element={<LoginComponent />} />
                            <Route path="/about" element={<AboutComponent/>} />
                            <Route path="contact" element={<ContactComponent />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </div>
                    <FooterComponent />
                </div>
            </BrowserRouter>
     //   </AuthProvider>
    );
}