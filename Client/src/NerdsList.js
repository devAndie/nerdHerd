import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from './Error';
import Nerd from "./Nerd";

class NerdsList extends React.Component {
      constructor(props) {
      super(props);
      this.state = {
        nerdsList: [],
        Loading: false,
        error: false
    };
}
    render(){
        const {nerdsList, loading, error} =this.state;
        if (loading) {
            return <Loading />;
        }
        if (error) {
            return <Error />;
        }
        return(
            <div className="ndhd-container">
                <div className="ndhd-nerd-list">
                   {nerdsList.map(n =>(
                       <Nerd key ={n.id} nerdsList={n}/>
                   ))} 
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.fetchNerdList();
    }
    fetchNerdList(){
        this.setState({Loading: true, error: false });

        axios
            .get("/api/technicians" )
            .then(Response =>{
                this.setState({
                    nerdsList: [],
                    Loading: false,
                    error: false
                });
            })
            .catch(error=>{
                this.setState({
                    nerdsList: [],
                    Loading: false,
                    error: true,
                });
            });
        
    }
}

export default NerdsList;