import React from "react";
import axios from "axios";
import { Link } from "@reach/router";
import Loading from "./Loading";
import Error from "./Error";

class OperatorsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Operators: [],
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.fetchOperators();
    }

    fetchOperators() {
        this.setState({ loading: true, error: false });

        axios
            .get("/api/operators")
            .then(response => {
                this.setState({
                    Operators: response.data,
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                this.setState({
                    Operators: [],
                    loading: false,
                    error: true
                });
            });
    }

    render() {
        const { Operators, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error />;
        }

        return (
            <div className="ndhd-container">
                <div className="ndhd-operators-list">
                    {Operators.map(o => (
                        <div key={o.id} className="ndhd-operators">
                            <div className="ndhd-operators-body">
                                <div className="ndhd-title">{o.name}</div>
                            </div>
                            <div className="ndhd-operators-footer">
                                <Link
                                    to={`/Operators/${o.id}`}
                                    className="ndhd-btn ndhd-btn-operators"
                                >
                                    See Operators
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default OperatorsList;