import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { getTrainingTypes } from '../../api/api';
import Statics from '../../static utils/Statics';

export default function CarouselComponent() {
    const [index, setIndex] = useState(0);
    const [trainingTypes, setTrainingTypes] = useState([]);

    useEffect(() => {
        getTrainingTypes()
            .then(response => {
                setTrainingTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching training types:', error);
            });
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <section className="py-5 border-bottom" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <div className="container-fluid">
                        <Carousel
                            interval={null}
                            indicators={false}
                            activeIndex={index}
                            onSelect={handleSelect}
                            prevIcon={<span className="custom-prev-icon" />}
                            nextIcon={<span className="custom-next-icon" />}
                        >
                            {trainingTypes.map(trainingType => (
                                <Carousel.Item key={trainingType.id}>
                                    <div className="col-md-4 mx-auto">
                                        <h2 className="h4 fw-bolder">{trainingType.name}</h2>
                                        <p>{trainingType.description}</p>
                                        <img
                                            className="d-block w-100"
                                            src={`${Statics.imagesBaseUrl}${trainingType.image}`}
                                            alt={trainingType.name}
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}