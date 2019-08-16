import React from "react";
import axios from "axios";
import TechnicianAdmin from "./TechnicianAdmin";
import OperatorAdmin from "./OperatorAdmin";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            technicians: [],
            techniciansLoading: false,
            techniciansError: false
        };

    }
    componentDidMount() {
        this.fetchTechnicians();
    }

    fetchTechnicians() {
        this.setState({ techniciansLoading: true, techniciansError: false });
        axios
            .get("/api/technicians")
            .then(response => {
                this.setState({
                    technicians: response.data,
                    techniciansLoading: false,
                    techniciansError: false
                });
            })
            .catch(error => {
                this.setState({
                    technicians: [],
                    techniciansLoading: false,
                    techniciansError: true
                });
            });
    }

    updateTechnicians(technicians) {
        this.setState({ technicians });
    }

    render() {
        const { technicians, techniciansLoading, techniciansError } = this.state;

        return (
            <div className="ndhd-container">
                <TechnicianAdmin
                    technicians={technicians}
                    techniciansLoading={techniciansLoading}
                    techniciansError={techniciansError}
                    updateTechnicians={this.updateTechnician}
                />
                <OperatorAdmin 
                    
                />
            </div>
        );
    }
}

export default Admin;