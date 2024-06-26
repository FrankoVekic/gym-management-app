import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Statics from '../../static utils/Statics';

const data = [
  { year: '2015', members: 500 },
  { year: '2016', members: 800 },
  { year: '2017', members: 1200 },
  { year: '2018', members: 1500 },
  { year: '2019', members: 2000 },
  { year: '2020', members: 2600 },
  { year: '2021', members: 3200 },
  { year: '2022', members: 3800 },
  { year: '2023', members: 4500 },
  { year: '2024', members: 5020 },
];


const CustomXAxis = ({ dataKey = 'year' }) => (
  <XAxis dataKey={dataKey} />
);

const CustomYAxis = ({}) => (
  <YAxis />
);

const ChartComponent = () => {
  return (
    <section className="py-5 border-bottom" id="growth">
      <div className="container px-5 my-5">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h2 className="fw-bolder">Member Growth</h2>
            <p>Explore our growth in membership over the years.</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <CustomXAxis />
                <CustomYAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="members" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="col-lg-6">
            <p className="lead">{Statics.chartDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartComponent;
