import React from "react";
import axios from "axios";
import Loading from "./Loading";
import error from './Error';
import Nerds from "./Nerds";

//function NerdsList({nerdsList}){
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
        const {nerdsList} =this.state;
        return(
            <div className="ndhd-container">
                <div className="ndhd-nerd-list">
                   {nerdsList.map(n =>(
                       <Nerds key ={n.id} nerdsList={n}/>
                   ))} 
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.fetchNerdList();
    }
}

export default NerdsList;