import React, { useEffect, useState } from 'react';
import { getAllContactEntries } from '../../../api/api'; 
import { Alert, Spinner, Table, Pagination, Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import URLSaver from '../../URLSaver';

const itemsPerPage = 5;

const ContactEntries = () => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await getAllContactEntries();
                setEntries(response.data);
                setFilteredEntries(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching contact entries:', error);
                setError('Failed to load contact entries');
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = entries.filter(item =>
            item.fullName.toLowerCase().includes(lowercasedTerm) ||
            item.email.toLowerCase().includes(lowercasedTerm) ||
            item.phoneNumber.includes(lowercasedTerm)
        );
        setFilteredEntries(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchTerm, entries]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleContacted = async (id, currentStatus) => {
        try {
           // await updateContactEntry(id, { contacted: !currentStatus });
            setEntries(prevEntries =>
                prevEntries.map(entry => 
                    entry.id === id ? { ...entry, contacted: !currentStatus } : entry
                )
            );
        } catch (error) {
            console.error('Error updating contact entry:', error);
            setError('Failed to update contact entry');
        }
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
    const paginatedEntries = filteredEntries.slice(startIndex, endIndex);

    return (
        <div className="container mt-5">
            <div className="d-flex flex-row mb-3">
                <URLSaver />
            </div>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>All Contact Form Entries</h5>
                </div>
                <div className="card-body">
                    <Form.Group controlId="searchBar" className="mb-4">
                        <Form.Label>Search by Name or Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search by full name or email"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>

                    {filteredEntries.length === 0 ? (
                        <Alert variant="primary">No contact entries found.</Alert>
                    ) : (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Message</th>
                                        <th>Created At</th>
                                        <th>Contacted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedEntries.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.message}</td>
                                            <td>
                                                {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
                                            </td>
                                            <td 
                                                onClick={() => toggleContacted(item.id, item.contacted)}
                                                style={{ cursor: 'pointer' }}
                                                title={item.contacted ? 'Click to mark as not contacted' : 'Click to mark as contacted'}
                                            >
                                                {item.contacted ? (
                                                    <i className="bi bi-check-circle-fill text-success"></i> 
                                                ) : (
                                                    <i className="bi bi-x-circle-fill text-danger"></i>
                                                )}
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

export default ContactEntries;
