import React from "react";
import ContactPageHeaderComponent from "../parts/Contact Page Components/ContactPageHeaderComponent";
import ContactInfoComponent from "../parts/Contact Page Components/ContactInfoComponent";
import ContactFormComponent from "../parts/Home Page Components/ContactFormComponent";

function ContactPage() {
    return (
      <div className="contact-page">
          <ContactPageHeaderComponent />
          <ContactInfoComponent />
          <ContactFormComponent />
      </div>
    );
  }
  
  export default ContactPage;