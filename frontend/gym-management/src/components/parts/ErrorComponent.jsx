import Statics from "../static utils/Statics";
import errorLogo from "../../style/images/404.png"
import URLSaver from "../parts/URLSaver";

const ErrorPageComponent = () => {
    return (
        <div className="not-found text-center vh-100 bg-light d-flex justify-content-center align-items-center">
            <div className="container">
                <img src={errorLogo} alt="404 error" className="mb-4" style={{maxWidth: '600px'}} />
                <h4 className="text-uppercase mb-4">{Statics.errorMessage}</h4>
                <p className="lead mb-5 text-wrap">
                  {Statics.errorDescriptionUp}
                  <br/>
                  {Statics.errorDescriptionDown}
                </p>
                <URLSaver />
            </div>
        </div>
    );
};

export default ErrorPageComponent;