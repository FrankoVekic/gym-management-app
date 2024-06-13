import CarouselComponent from '../parts/Home Page Components/CarouselComponent';
import TestimonialComponent from '../parts/Home Page Components/TestimonialComponent';
import TrainingPackagesComponent from '../parts/Home Page Components/TrainingPackagesComponent';
import HPHeaderComponent from '../parts/Home Page Components/HPHeaderComponent';
import ContactFormComponent from '../parts/Home Page Components/ContactFormComponent';


export default function HeaderComponent() {

    return (
        <div>
            <HPHeaderComponent/>
            <CarouselComponent />           
            <TrainingPackagesComponent/>
            <TestimonialComponent/>
            <ContactFormComponent/>
        </div>
    );
}