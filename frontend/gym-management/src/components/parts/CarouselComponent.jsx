import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';


export default function CarouselComponent() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
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
                            <Carousel.Item>
                                <div className="col-md-4 mx-auto">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-collection"></i>
                                    </div>
                                    <h2 className="h4 fw-bolder">Featured title 1</h2>
                                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                                    <img
                                        className="d-block w-100"
                                        src="https://via.placeholder.com/300x140"
                                        alt="First slide"
                                    />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="col-md-4 mx-auto">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-building"></i>
                                    </div>
                                    <h2 className="h4 fw-bolder">Featured title 2</h2>
                                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                                    <img
                                        className="d-block w-100"
                                        src="https://via.placeholder.com/300x140"
                                        alt="Second slide"
                                    />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="col-md-4 mx-auto">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                                        <i className="bi bi-toggles2"></i>
                                    </div>
                                    <h2 className="h4 fw-bolder">Featured title 3</h2>
                                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                                    <img
                                        className="d-block w-100"
                                        src="https://via.placeholder.com/300x140"
                                        alt="Third slide"
                                    />
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}