import React from 'react';
import Statics from '../static utils/Statics';

const FooterComponent = () => {
    return (
        <footer className="footer text-center text-lg-start text-white">
            <div className="container p-4 pb-0">
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">{Statics.firmName}</h6>
                            <p>
                                {Statics.footerDescription}
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Useful Links</h6>
                            <p>
                                <a className="text-white">Register for Training</a>
                            </p>
                            <p>
                                <a className="text-white">View Training Schedule</a>
                            </p>
                            <p>
                                <a className="text-white">Account Login</a>
                            </p>
                            <p>
                                <a className="text-white">Contact Us</a>
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Resources</h6>
                            <p>
                                <a className="text-white">Blog</a>
                            </p>
                            <p>
                                <a className="text-white">FAQs</a>
                            </p>
                            <p>
                                <a className="text-white">Customer Reviews</a>
                            </p>
                            <p>
                                <a className="text-white">Terms and Conditions</a>
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> {Statics.firmAddress}</p>
                            <p><i className="fas fa-envelope mr-3"></i> {Statics.infoEmail}</p>
                            <p><i className="fas fa-phone mr-3"></i> {Statics.mobileNumber}</p>
                            <p><i className="fas fa-print mr-3"></i>  {Statics.phoneNumber}</p>
                        </div>
                    </div>
                </section>
                <hr className="my-3" />
                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            <div className="p-3">
                                {Statics.copyright}
                                <a className="text-white" href={Statics.websiteUrl}>{Statics.firmName}</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default FooterComponent;