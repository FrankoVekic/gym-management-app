import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/css/style.css';  
import logo from '../../style/images/logo.png'
import Statics from '../static utils/Statics';


export default function HeaderComponent() {
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
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link text-blue" aria-current="page" to="/">{Statics.navbarLink1}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-blue" to="/about">{Statics.navbarLink2}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-blue" to="/contact">{Statics.navbarLink3}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-blue" to="/services">{Statics.navbarLink4}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-blue" to="/login">{Statics.navbarLink5}</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}