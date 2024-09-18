import React, { useEffect, useState, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { getMemberStatusesAndTrainingPackages, getAllStatuses, updateMemberStatus } from '../../api/api';

const ClientStatusTable = () => {
    const [data, setData] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembersData = async () => {
            try {
                const response = await getMemberStatusesAndTrainingPackages();
                setData(response.data);

                const statusResponse = await getAllStatuses();
                setStatuses(statusResponse.data);
            } catch (error) {
                setError('Failed to fetch data.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembersData();
    }, []);

    const handleStatusChange = async (memberId, newStatusId) => {
        try {
            const response = await updateMemberStatus({
                memberId: memberId,
                statusId: newStatusId
            });

            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(member =>
                        member.id === memberId
                            ? {
                                ...member,
                                statusId: parseInt(newStatusId, 10),
                                trainingPackage: (newStatusId === '3') || (newStatusId === '4') ? null : member.trainingPackage,
                                trainingPackageExpirationDate: (newStatusId === '3') ? null : member.trainingPackageExpirationDate
                            }
                            : member
                    )
                );
            }
        } catch (error) {
            setError('Failed to update status.');
        }
    };


    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstname' },
        { Header: 'Last Name', accessor: 'lastname' },
        {
            Header: 'Status',
            accessor: 'statusId',
            Cell: ({ row }) => (
                <select
                    key={row.original.id}
                    value={row.original.statusId}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                >
                    {statuses.map(status => (
                        <option key={status.id} value={status.id}>
                            {status.statusType}
                        </option>
                    ))}
                </select>
            )
        },
        
        {
            Header: 'Training Package',
            accessor: 'trainingPackage',
            Cell: ({ value }) => value ? value : '-'
        },
        {
            Header: 'Expiration Date',
            accessor: 'trainingPackageExpirationDate',
            Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-'
        }
    ], [statuses]);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, globalFilter },
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
        pageCount
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }
        },
        useGlobalFilter,
        usePagination
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 style={{ textAlign: 'center', width: '100%' }}>List Of Members</h5>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={globalFilter || ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        className="form-control"
                    />
                </div>
                <table {...getTableProps()} className="table table-striped">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} key={column.id}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.original.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-primary btn-sm">
                        {'<<'}
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-primary btn-sm">
                        {'<'}
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-primary btn-sm">
                        {'>'}
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-primary btn-sm">
                        {'>>'}
                    </button>
                    <span>
                        Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ClientStatusTable;
