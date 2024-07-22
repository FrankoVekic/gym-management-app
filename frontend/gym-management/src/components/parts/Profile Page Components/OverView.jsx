import React from "react";


const Overview = () => {
    return (
            <div
                className="tab-pane fade show active"
                id="overview-tab-pane"
                role="tabpanel"
                aria-labelledby="overview-tab"
                tabIndex={0}
            >
                <h5 className="mb-3">About</h5>
                <p className="lead mb-3">
                    Ethan Leo is a seasoned and results-driven Project Manager who
                    brings experience and expertise to project management. With a
                    proven track record of successfully delivering complex
                    projects on time and within budget, Ethan Leo is the go-to
                    professional for organizations seeking efficient and effective
                    project leadership.
                </p>
                <h5 className="mb-3">Profile</h5>
                <div className="row g-0">
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">First Name</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">Ethan</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Last Name</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">Leo</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Education</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">M.S Computer Science</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Address</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">Mountain View, California</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Country</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">United States</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Job</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">Project Manager</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Company</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">GitHub Inc</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Phone</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">+1 (248) 679-8745</div>
                    </div>
                    <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div className="p-2">Email</div>
                    </div>
                    <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div className="p-2">leo@example.com</div>
                    </div>
                </div>
            </div>
        
    );
}

export default Overview;