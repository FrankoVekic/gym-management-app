import React, { useEffect, useState } from "react";
import { getTestimonialUsers } from '../../../api/api';
import { Alert, Spinner, Table, Pagination, Form } from 'react-bootstrap';
import URLSaver from '../../URLSaver';
import dayjs from 'dayjs';

const itemsPerPage= 5;

const Testimonials = () => {
    const [feedback, setFeedback] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getTestimonialUsers();
                const totalItems = response.data.length;
                setFeedback(response.data);
                setFilteredFeedback(response.data);
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError('Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {

        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = feedback.filter(item =>
            item.user.firstName.toLowerCase().includes(lowercasedTerm) ||
            item.user.lastName.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredFeedback(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchTerm, feedback]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFeedback = filteredFeedback.slice(startIndex, endIndex);

    return (
        <div className="container mt-5">
            <div className="d-flex flex-row mb-3">
                <URLSaver />
            </div>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>All Testimonials</h5>
                </div>
                <div className="card-body">
                    <Form.Group controlId="searchBar" className="mb-4">
                        <Form.Label>Search by Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search by first name or last name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>

                    {filteredFeedback.length === 0 ? (
                        <Alert variant="primary">No testimonials available.</Alert>
                    ) : (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Testimonial</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedFeedback.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{item.user.firstName} {item.user.lastName}</td>
                                            <td>{item.testimonials.content}</td>
                                            <td>
                                                {dayjs(item.testimonials.createdAt).format('DD/MM/YYYY HH:mm')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className="d-flex justify-content-center mt-4">
                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    />
                                    {[...Array(totalPages).keys()].map(number => (
                                        <Pagination.Item
                                            key={number + 1}
                                            active={number + 1 === currentPage}
                                            onClick={() => handlePageChange(number + 1)}
                                        >
                                            {number + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    />
                                </Pagination>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
