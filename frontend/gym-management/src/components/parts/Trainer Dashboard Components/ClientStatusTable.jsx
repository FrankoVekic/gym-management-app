import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

const ClientStatusTable = ({ columns, data }) => {
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
                                <tr {...row.getRowProps()} key={row.id}>
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
