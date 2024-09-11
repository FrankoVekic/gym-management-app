import React, { useEffect, useState } from 'react';
import { getTrainingPackages } from '../../api/api';
import { Link } from 'react-router-dom';

const TrainingPackagesComponent = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        getTrainingPackages()
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the training packages!', error);
            });
    }, []);

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    };

    const buttonContainerStyle = {
        marginTop: 'auto',
    };

    return (
        <section className="bg-light py-5 border-bottom">
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Training Packages</h2>
                    <p className="lead mb-0">Choose the best plan for your needs</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    {packages.map(pkg => (
                        <div className="col-lg-6 col-xl-4" key={pkg.id}>
                            <div className="card mb-5 mb-xl-0" style={cardStyle}>
                                <div className="card-body p-5 d-flex flex-column">
                                    <div className="small text-uppercase fw-bold text-muted">{pkg.name}</div>
                                    <div className="mb-3">
                                        <span className="display-4 fw-bold">€{pkg.price}</span>
                                        <span className="text-muted">/ mo.</span>
                                    </div>
                                    <ul className="list-unstyled mb-4">
                                        {pkg.features.split(',').map((feature, index) => (
                                            <li className="mb-2" key={index}><i className="bi bi-check text-primary"></i> {feature}</li>
                                        ))}
                                    </ul>
                                    <div className="d-grid" style={buttonContainerStyle}>
                                        <Link
                                            to={`/training-package-detail/${pkg.id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            Choose plan
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrainingPackagesComponent;
