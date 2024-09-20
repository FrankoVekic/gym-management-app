import Statics from "../../static utils/Statics";



const AboutHeaderComponent = () => {

    return (
        <header className="header-bg-about py-5">
            <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-center my-5">
                            <h1 className="display-5 fw-bolder text-white mb-2">{Statics.aboutPageTitle}</h1>
                            <p className="lead text-white mb-4">{Statics.aboutPageDescription}</p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                <a className="btn btn-primary btn-lg px-4 me-sm-3" href="/login">{Statics.homePageregisterButton}</a>
                                <a className="btn btn-outline-light btn-lg px-4" href="/about">{Statics.homePagelearnMoreButton}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );

}

export default AboutHeaderComponent;

