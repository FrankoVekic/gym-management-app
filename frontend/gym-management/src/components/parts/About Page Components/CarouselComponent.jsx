import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { getTrainers } from '../../api/api';
import Statics from '../../static utils/Statics';

export default function CarouselComponent() {

    const [index, setIndex] = useState(0);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        getTrainers()
            .then(response => {
                setTrainers(response.data);
            })
            .catch(error => {
                console.error('Error fetching trainers:', error);
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
                        <div className="text-center mb-5">
                            <h2 className="fw-bolder">{Statics.carouselTrainersTitle}</h2>
                            <p className="lead mb-0">{Statics.carouselTrainersDesc}</p>
                        </div>
                        <Carousel
                            interval={null}
                            indicators={false}
                            activeIndex={index}
                            onSelect={handleSelect}
                            prevIcon={<span className="custom-prev-icon" />}
                            nextIcon={<span className="custom-next-icon" />}
                        >
                            {trainers.map(trainer => (
                                <Carousel.Item key={trainer.user.id}>
                                    <div className="col-md-4 mx-auto">
                                        
                                        <p>Status: {trainer.status.statusType}</p>
                                        <p className="container-class">{trainer.description}</p>
                                        <h3 className="h5 fw-bolder">{trainer.user.firstName + " " + trainer.user.lastName}</h3>
                                        <img
                                            className="d-block w-100 trainer-image-about"
                                            src={`${Statics.imagesFEUrl}${trainer.user.image}`}
                                            alt={trainer.user.firstName}
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