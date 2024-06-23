import React from 'react';
import ContactFormComponent from '../parts/Home Page Components/ContactFormComponent';
import CarouselComponent from '../parts/About Page Components/CarouselComponent';
import AboutHeaderComponent from '../parts/About Page Components/AboutHeaderComponent';
import ChartComponent from '../parts/About Page Components/ChartComponent';
import MissionVisionComponent from '../parts/About Page Components/MissionVisionComponent';
import HistoryComponent from '../parts/About Page Components/HistoryComponent';

const AboutComponent = () => {
  return (
    <div className="about-page">
      <AboutHeaderComponent />
      <MissionVisionComponent />
      <ChartComponent />
      <CarouselComponent />
      <HistoryComponent />
      <ContactFormComponent />
    </div>
  );
};

export default AboutComponent;
