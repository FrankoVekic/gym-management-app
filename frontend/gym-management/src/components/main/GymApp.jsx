import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from "../pages/LoginComponent";
import HeaderComponent from "../parts/HeaderComponent";
import HomeComponent from '../pages/HomeComponent';
import FooterComponent from '../parts/FooterComponent';
import ErrorComponent from '../parts/ErrorComponent';

export default function GymApp() {
    return (
        <BrowserRouter>
            <div className="GymApp">
                <HeaderComponent />
                <div className="content">
                    <Routes>

                        <Route path='/' element={<HomeComponent />} />
                        <Route path='/login' element={<LoginComponent />} />

                        <Route path='*' element={<ErrorComponent/>}/>

                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}