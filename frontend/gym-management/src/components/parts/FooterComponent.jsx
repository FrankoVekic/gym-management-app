import React from 'react';
import Statics from '../static utils/Statics';
const FooterComponent = () => {
    return (
        <footer className="footer text-center text-lg-start text-white mt-5">
            <div className="container p-4 pb-0">
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">{Statics.firmName}</h6>
                            <p>{Statics.footerDescription}</p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3" style={{ textAlign: 'center' }}>
                            <h6 className="text-uppercase mb-4 font-weight-bold">Useful Links</h6>
                            <p><a className="text-white" href="/">Register for Training</a></p>
                            <p><a className="text-white" href="/">View Training Schedule</a></p>
                            <p><a className="text-white" href="/">Account Login</a></p>
                            <p><a className="text-white" href="/">Contact Us</a></p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3" style={{ textAlign: 'center' }}>
                            <h6 className="text-uppercase mb-4 font-weight-bold">Resources</h6>
                            <p><a className="text-white" href="/">Blog</a></p>
                            <p><a className="text-white" href="/">FAQs</a></p>
                            <p><a className="text-white" href="/">Customer Reviews</a></p>
                            <p><a className="text-white" href="/">Terms and Conditions</a></p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3" style={{ textAlign: 'center' }}>
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> {Statics.firmAddress}</p>
                            <p><i className="fas fa-envelope mr-3"></i> {Statics.infoEmail}</p>
                            <p><i className="fas fa-phone mr-3"></i> {Statics.mobileNumber}</p>
                            <p><i className="fas fa-print mr-3"></i> {Statics.phoneNumber}</p>
                        </div>
                    </div>
                </section>
                <hr className="my-3" />
                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-12 text-left copyright">
                            <div className="p-3">
                                © 2024 Copyright: <a className="text-white" href={Statics.websiteUrl}>{Statics.firmName}</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default FooterComponent;