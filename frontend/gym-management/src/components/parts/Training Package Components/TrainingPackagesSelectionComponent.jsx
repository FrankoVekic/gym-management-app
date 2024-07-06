import React, { useEffect, useState } from 'react';
import { getTrainingPackages } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const TrainingPackagesSelectionComponent = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTrainingPackages()
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the training packages!', error);
            });
    }, []);

    const handleChoosePlan = (id) => {
        navigate(`/training-package-detail/${id}`);
    };

    return (
        <section className="bg-light py-5 border-bottom">
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bolder">Join our Training Groups!</h2>
                </div>
                <div className="row justify-content-center">
                    {packages.map(pkg => (
                        <div className="col-lg-10 col-xl-8 mb-4" key={pkg.id}>
                            <div className="card">
                                <div className="card-body p-5">
                                    <h3 className="card-title">{pkg.name}</h3>
                                    <p className="small text-muted mb-3">€{pkg.price} / mo.</p>
                                    <ul className="list-unstyled mb-4">
                                        {pkg.features.split(',').map((feature, index) => (
                                            <li key={index}><i className="bi bi-check text-primary"></i> {feature}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleChoosePlan(pkg.id)}
                                    >
                                        Choose plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrainingPackagesSelectionComponent;
