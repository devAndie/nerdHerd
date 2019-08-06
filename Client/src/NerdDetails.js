import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";
import { Location } from "@reach/router";
import { EINPROGRESS } from "constants";

class NerdDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            nerdDetails: [],
            customers: [],
            Loading: false,
            error: false 
        };
    }
    componentDidMount() {
        this.fetchNerdDetails();
    }
    fetchNerdDetails(){
        this.setState ({Loading: true, error: false});
        const {nerdId} = this.props;
        const nerdDetailsPromise = axios.get(`/api/nerds/${nerdId}`);
        const customersPromise = axios.get(`/api/nerds/${nerdId}/customers`);
        axios
        .all([nerdDetailsPromise, customersPromise])
        .then(
            axios.spread((nerdDetailsResponse, customersResponse) =>{
                this.setState({
                    nerdDetails: nerdDetailsResponse.data,
                    customers: customersResponse.data,
                    loading: false,
                    error: false
                });
            })
        )
        .catch(error =>{
            this.setState({
                nerdDetails: [],
                customers: [],
                loading: false,
                error: true
            });
        });
    }
    toDateString(location) {
        const dispatch = new Dispatch(location);
        const address = location.getFullAddress();
        const count = date.getCount() +1;

        return `${address} - ${count}`;
    }
    render(){
        const {nerdDetails, customers, loading, error} = this.state;
        if (loading){
            return <Loading />
        }
        if (error){
            return <Error />
        }
        if (nerdDetails.length !== 1){
            return (
                <Error message="Sorry, the personnel does not exist. Please retry." />
            );
        }
        const {Operator_name, Technician_name, affilliation, department,} = nerdDetails[0];
        const customerNameDateStrings = customers.map(customers =>{
            const dateString = this.toDateString(customers.address);
            return `${customers.address}:${dateString}`;
        });

        return (
            <div className="ndhd-container">
                <div className="ndhd-nerd-details-wrapper">
                    <div className="ndhd-nerd-details">
                        <img
                        className= "ndhd-nerd-details-photo"
                        src={photo}
                        alt={title}/>
                        <div className="ndhd-nerd-details-info">
                            <h2>{title}</h2>
                            <p>{department}</p>
                            <p>
                                <span>affilliation</span>:{affilliation}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ndhd-nerd-customers">
                    <h2>Rated 4 stars</h2>
                </div>
            </div>
        );
    }
}

export default NerdDetails;
