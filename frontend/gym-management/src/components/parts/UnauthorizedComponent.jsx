import UnauthorizedLogo from "../../style/images/401.png"
import URLSaver from "../parts/URLSaver";
import Statics from "../static utils/Statics";

const UnauthorizedComponent = () => {
    return (
        <div className="not-found text-center vh-100 bg-light d-flex justify-content-center align-items-center">
            <div className="container">
                <img src={UnauthorizedLogo} alt="Unauthorized error" className="mb-4"  style={{maxWidth: '600px'}} />
                <h4 className="text-uppercase mb-4">{Statics.unauthorizedMessage}</h4>
                <p className="lead mb-5 text-wrap">
                  {Statics.unauthorizedDescriptionUp}
                  <br/>
                  {Statics.unauthorizedDescriptionDown}
                </p>
                <URLSaver />
            </div>
        </div>
    );
};

export default UnauthorizedComponent;
