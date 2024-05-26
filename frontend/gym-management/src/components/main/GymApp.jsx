import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from "../pages/LoginComponent";
import HeaderComponent from "../parts/HeaderComponent";
import HomeComponent from '../pages/HomeComponent'
import FooterComponent from '../parts/FooterComponent';

export default function GymApp() {
    return (
        <BrowserRouter>
            <div className="GymApp">
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                 
                </Routes>
                <FooterComponent/>
            </div>
        </BrowserRouter>
    );
}