import React from "react";
import axios from "axios";
import { Link } from "@reach/router";
import Loading from "./Loading";
import Error from "./Error";

function TechniciansList(props) {
    return (
        <div>
            <h1>Technician {props.TechnicianId} list</h1>
        </div>
    );
}
class techniciansList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Technicians: [],
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.fetchCinemas();
    }

    fetchTechnicians() {
        this.setState({ loading: true, error: false });

        axios
            .get("/api/technicians")
            .then(response => {
                this.setState({
                    Technicians: response.data,
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                this.setState({
                    Technicians: [],
                    loading: false,
                    error: true
                });
            });
    }

    render() {
        const { Technicians, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error />;
        }

        return (
            <div className="ndhd-container">
                <div className="ndhd-technician-list">
                    {Technicians.map(t => (
                        <div key={t.id} className="ndhd-technician">
                            <div className="ndhd-technician-body">
                                <div className="ndhd-title">{t.name}</div>
                            </div>
                            <div className="ndhd-technician-footer">
                                <Link
                                    to={`/technician/${t.id}`}
                                    className="ndhd-btn ndhd-btn-technicians"
                                >
                                    See Technicians
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TechniciansList;