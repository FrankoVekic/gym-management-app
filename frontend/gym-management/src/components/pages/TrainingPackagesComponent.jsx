import React from "react";
import TrainingPackagesSelectionComponent from "../parts/Training Package Components/TrainingPackagesSelectionComponent";
import ContactFormComponent from "../parts/Home Page Components/ContactFormComponent";
import TrainingPackagesHeaderComponent from "../parts/Training Package Components/TrainingPackagesHeaderComponent";

const TrainingPackagesComponent = () => {

    return (
        <div>
            <TrainingPackagesHeaderComponent/>
            <TrainingPackagesSelectionComponent/>
            <ContactFormComponent/>
        </div>
    );
}
export default TrainingPackagesComponent;
