import React, { useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/css/style.css';  
import logo from '../../style/images/logo.png'
import Statics from '../static utils/Statics';
import { AuthContext } from "../context/AuthContext";

export default function HeaderComponent() {
    const { authState, logout } = useContext(AuthContext);

    const renderMemberLinks = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link text-blue" aria-current="page" to="/">{Statics.navbarHome}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-blue" to="/about">{Statics.navbarAbout}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-blue" to="/contact">{Statics.navbarContact}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-blue" to="/services">{Statics.navbarServices}</Link>
            </li>
        </>
    );

    const renderTrainerLinks = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link text-blue" aria-current="page" to="/">{Statics.navbarHome}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-blue" to="/trainer-dashboard">{Statics.navBarTrainerDash}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-blue" to="/trainer-management">{Statics.navbarTrainerManage}</Link>
            </li>
        </>
    );

    const renderDefaultLinks = () => (
        <>
            <li className="nav-item">
                <Link className="nav-link text-blue" to="/login">{Statics.navbarLogin}</Link>
            </li>
        </>
    );

    const renderLinksBasedOnRole = () => {
        if (authState && authState.user && authState.user.role) { 
            const { role } = authState.user; 

            if (role === "MEMBER") { 
                return renderMemberLinks();
            } else if (role === "TRAINER") { 
                return renderTrainerLinks();
            }
        }
        return renderDefaultLinks();
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container px-5">
                <Link className="navbar-brand" to="/">
                    <img src={logo} 
                        alt="avatar" 
                        className="avatar-img"  
                        style={{ width: '70px', height: '50px' }} />
                    {Statics.navbarTitle}
                </Link>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {renderLinksBasedOnRole()}
                        {authState && authState.user && (
                            <li className="nav-item">
                                <button className="nav-link text-blue" onClick={logout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
