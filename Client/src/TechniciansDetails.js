import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

class TechniciansDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TechniciansDetails: [],
            loading: false,
            error: false
        };
    }
    componentDidMount() {
        this.fetchTechniciansDetails();
    }

   fetchTechniciansDetails() {
        this.setState({ loading: true, error: false });
        const { TechnicianId } = this.props;
        const TechnicianDetails = axios.get(`/api/technicians/${TechnicianId}`);

        axios
            .all([TechnicianDetails])
            .then(
                axios.spread((TechnicianDetailsResponse) => {
                    this.setState({
                        TechnicianDetails: TechnicianDetailsResponse.data,
                        loading: false,
                        error: false
                    });
                })
            )
            .catch(error => {
                this.setState({
                    movieDetails: [],
                    loading: false,
                    error: true
                });
            });
    }
     toDateString(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month}-${day}`;
    }

    render() {
        const { TechnicianDetails, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }
        if (error) {
            return <Error />;
        }
        if (TechnicianDetails.length !== 1) {
            return (
                <Error message="Sorry, the Technician does not exist. Please retry." />
            );
        }

        const {
            name,
            affiliation, description, TechniciansDispatched,
            photo
        } = TechnicianDetails[0];

        return (
            <div className="ndhd-container">
                <div className="ndhd-movie-details-wrapper">
                    <div className="mvls-movie-details">
                        <img
                            className="ndhd-technician-details-poster"
                            src={photo} alt={photo}
                        />
                        <div className="ndhd-technician-details-info">
                            <h2>{name}</h2>
                            <p>{description}</p>
                            <p>
                                <span>Name</span>: {name}
                            </p>
                            <p>
                                <span>affiliation</span>: {affiliation} 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ndhd-technicians-dispatched">
                    <h2>List of technicians dispatched e</h2>
                    {TechniciansDispatched.map(Technician => {
                        const { TechnicianName, affiliation } = Technician;

                        return (
                            <div
                                key={`${TechnicianName}:${affiliation}`}
                                className="ndhd-Technician-list"
                            >
                                <h3>{TechnicianName}</h3>
                                <p>{affiliation}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

  export default TechniciansDetails;