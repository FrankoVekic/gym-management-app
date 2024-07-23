import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartsCarouselComponent = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const clientsData = {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Number of Clients',
                data: [5, 20, 45, 80, 150, 250, 400, 600, 900, 1200, 1600, 2100, 2700, 3500, 4500],
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const sessionsData = {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Number of Sessions',
                data: [10, 30, 60, 100, 150, 220, 310, 420, 550, 700, 870, 1060, 1270, 1500, 1750],
                backgroundColor: 'rgba(153,102,255,0.6)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            },
        ],
    };

    const earningsData = {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Earnings ($)',
                data: [1000, 3000, 7000, 12000, 18000, 25000, 33000, 42000, 52000, 63000, 75000, 88000, 102000, 117000, 133000],
                backgroundColor: 'rgba(255,159,64,0.6)',
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 1,
            },
        ],
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
                                <div className="col-md-8 mx-auto">
                                    <h2 className="h4 fw-bolder">Clients Over the Years</h2>
                                    <Line data={clientsData} />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="col-md-8 mx-auto">
                                    <h2 className="h4 fw-bolder">Training Sessions Over the Years</h2>
                                    <Bar data={sessionsData} />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="col-md-8 mx-auto">
                                    <h2 className="h4 fw-bolder">Earnings Over the Years</h2>
                                    <Bar data={earningsData} />
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChartsCarouselComponent;
