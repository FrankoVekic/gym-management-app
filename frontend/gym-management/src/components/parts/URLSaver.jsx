import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const URLSaver = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div>
            <Button variant="primary" onClick={handleBackClick}>Back</Button>
            
        </div>
    );
};

export default URLSaver;
