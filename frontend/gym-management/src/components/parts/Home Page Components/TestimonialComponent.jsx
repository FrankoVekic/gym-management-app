import React, { useState, useEffect } from 'react';
import { getTestimonialUsers} from '../../api/api'
import Statics from '../../static utils/Statics';

const TestimonialComponent = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        getTestimonialUsers()
            .then(response => {
                setTestimonials(response.data);
            })
            .catch(error => {
                console.error('Error fetching testimonials:', error);
            });
    }, []);

    return (
        <section className="py-5 border-bottom">
            <div className="container px-5 my-5 px-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">{Statics.testimonialsTitle}</h2>
                    <p className="lead mb-0">{Statics.testimonialSmallTitle}</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        {testimonials.map(testimonial => (
                            <div className="card mb-4" key={testimonial.id}>
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                        <div className="ms-4">
                                            <p className="mb-1">{testimonial.testimonials.content}</p>
                                            <div className="small text-muted"style={{ textAlign: 'left' }}>-{testimonial.user.firstName} {testimonial.user.lastName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialComponent;