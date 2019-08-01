import React from "react";

function TechniciansTable({
    Technicians,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditTechnician,
    onDeleteTechnician
}) {
    if (tableLoading) {
        return <p className="ndhd-table-loading">Loading Technicians...</p>;
    }

    return (
        <div className="ndhd-table">
            {deleteSuccess && (
                <p className="ndhd-alert mvls-alert-success">
                    Record deleted successfully.
                </p>
            )}
            {tableError && (
                <p className="ndhd-alert ndhd-alert-error">
                    Sorry, a server error occurred. Please retry.
                </p>
            )}
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {Technicians.length === 0 && (
                    <tbody>
                        <td colSpan="3" className="mvls-no-data">
                            No data
                        </td>
                    </tbody>
                )}
                {Technicians.length > 0 && (
                    <tbody>
                        {Technicians.map((Technician, index) => {
                            const { id, name } = Technician;

                            return (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>
                                        <span
                                            className="mvls-table-link"
                                            onClick={onEditTechnician(Technician)}
                                        >
                                            Edit
                                        </span>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <span
                                            className="mvls-table-link"
                                            onClick={onDeleteTechnician(
                                                Technician,
                                                Technicians
                                            )}
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default TechniciansTable;