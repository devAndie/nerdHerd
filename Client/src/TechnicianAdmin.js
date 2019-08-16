import React from "react";
import axios from "axios";
import TechniciansForm from "./TechnicianForm";
import TechniciansTable from "./TechniciansTable";


class TechnicianAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            Technician: [],
            tableLoading: false,
            tableError: false,
            deleteSuccess: false
        };

        this.resetFormState = this.resetFormState.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditTechnician = this.handleEditTechnician.bind(this);
        this.handleDeleteTechnician = this.handleDeleteTechnician.bind(this);
    }

    componentDidMount() {
        this.fetchTechnicians();
    }

    fetchTechnicians() {
        this.setState({ tableLoading: true, tableError: false });

        axios
            .get("/api/technicians")
            .then(response => {
                this.setState({
                    Technicians: response.data,
                    tableLoading: false,
                    tableError: false
                });
            })
            .catch(error => {
                this.setState({
                    Technicians: [],
                    tableLoading: false,
                    tableError: true
                });
            });
    }

    resetFormState() {
        this.setState({
            name: "",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            deleteSuccess: false
        });
    }

    isValid() {
        const { validationErrors, isValid } = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    validateFormInput(data) {
        const validationErrors = {};
        const { name } = data;

        if (!name) {
            validationErrors.name = "This field is required";
        }

        return {
            validationErrors,
            isValid: Object.keys(validationErrors).length === 0
        };
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { editing, Technicians, id, name } = this.state;

        if (this.isValid()) {
            this.setState({
                validationErrors: {},
                formSubmitting: true,
                formSuccess: false,
                formError: false
            });

            if (editing) {
                // Existing record - update
                axios
                    .put(`/api/Technicians/${id}`, { name })
                    .then(response => {
                        this.resetFormState();

                        const index = Technicians.findIndex(t => t.id === id);

                        this.setState({
                            formSuccess: true,
                            Technicians: [
                                ...Technicians.slice(0, index),
                                { id, name },
                                ...Technicians.slice(index + 1)
                            ]
                        });
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            } else {
                // New record - Save
                axios
                    .post("/api/Technicians", { name })
                    .then(response => {
                        this.resetFormState();
                        this.setState({
                            formSuccess: true,
                            Technicians: [...Technicians, { id: response.data, name }]
                        });
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            }
        }
    }

    handleEditTechnician(Technician) {
        return () => {
            this.setState({ ...Technician, editing: true });
        };
    }

    handleDeleteTechnician(Technician, Technicians) {
        return () => {
            const { id, name } = Technician;

            // eslint-disable-next-line no-restricted-globals
            if (confirm(`Are you sure you want to delete '${name}'?`)) {
                axios
                    .delete(`/api/technicians/${id}`)
                    .then(response => {
                        const index = Technicians.findIndex(c => c.id === id);

                        this.setState({
                            Technicians: [
                                ...Technicians.slice(0, index),
                                ...Technicians.slice(index + 1)
                            ],
                            deleteSuccess: true,
                            tableError: false
                        });
                    })
                    .catch(error => {
                        this.setState({
                            deleteSuccess: false,
                            tableError: true
                        });
                    });
            }
        };
    }

    render() {
        const {
            name,
            editing,
            formSubmitting,
            validationErrors,
            formSuccess,
            formError,
            Technicians,
            tableLoading,
            tableError,
            deleteSuccess
        } = this.state;

        return (
            <div className="ndhd-Technicians-admin">
                <h1>Technicians</h1>
                <h3>{editing ? "Edit Technicians" : "Add Technicians"}</h3>
                <TechniciansForm
                    name={name}
                    formSubmitting={formSubmitting}
                    validationErrors={validationErrors}
                    formSuccess={formSuccess}
                    formError={formError}
                    handleNameChange={this.handleNameChange}
                    resetFormState={this.resetFormState}
                    handleSubmit={this.handleSubmit}
                />
                <TechniciansTable
                    Technicians={Technicians}
                    tableLoading={tableLoading}
                    tableError={tableError}
                    deleteSuccess={deleteSuccess}
                    onEditTechnicians={this.handleEditTechnician}
                    onDeleteTechnicians={this.handleDeleteTechnician}
                />
            </div>
        );
    }
}

export default TechnicianAdmin;