import React from "react";
import Statics from '../../static utils/Statics';

const ContactInfoComponent = () => {
  return (
    <section className="border-bottom py-5 mt-5">
      <div className="container text-center">
        <div className="row gy-5 align-items-center">
          <div className="col">
          <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-geo"></i></div>
            <div className="p-3 border bg-primary text-white rounded-3">
              <div className="d-flex flex-column justify-content-center">
              <h4 className="m-3">ADDRESS</h4>
                <p>{Statics.firmStreet}</p>
                <p>{Statics.firmAddress}</p>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-telephone-fill"></i></div>
            <div className="p-3 border bg-primary text-white rounded-3">
              <div className="d-flex flex-column justify-content-center">
                <h4 className="m-3">PHONE</h4>
                <p>{Statics.mobileNumber}</p>
                <p>{Statics.phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
            <div className="p-3 border bg-primary text-white rounded-3">
              <div className="d-flex flex-column justify-content-center">
              <h4 className="m-3">EMAIL</h4>
                <p>{Statics.infoEmail}</p>
                <p>{Statics.supportEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoComponent;
