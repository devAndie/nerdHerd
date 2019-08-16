import React from "react";

function TechniciansTable({
    technicians,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditTechnician,
    onDeleteTechnician
}) {
    if (tableLoading) {
        return <p className="ndhd-table-loading">Loading technicians...</p>;
    }

    return (
        <div className="ndhd-table">
            {deleteSuccess && (
                <p className="ndhd-alert ndhd-alert-success">
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
                        <th>Technician_id</th>
                        <th>Technician_name</th>
                        <th>Affiliation</th>
                        <th>Operator_id</th>
                    </tr>
                </thead>
                {technicians.length === 0 && (
                    <tbody>
                        <tr>
                            <td colSpan="8" className="ndhd-no-data">
                                No data
                            </td>
                        </tr>
                    </tbody>
                )}
                {technicians.length > 0 && (
                    <tbody>
                        {technicians.map((technician, index) => {
                            const {
                                technician_id,
                                technician_name,
                                affiliation,
                                operator_id,
                            } = technician;

                            return (
                                <tr key={technician_id}>
                                    <td>{index + 1}</td>
                                    <td>{technician_name}</td>
                                    <td>{affiliation}</td>
                                    <td>{operator_id}</td>
                                    <td>
                                        <span
                                            className="ndhd-table-link"
                                            onClick={onEditTechnician(technician)}
                                        >
                                            Edit
                                        </span>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <span
                                            className="ndhd-table-link"
                                            onClick={onDeleteTechnician(
                                                technician,
                                                technicians
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