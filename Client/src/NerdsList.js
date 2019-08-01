import React from "react";
import axios from "axios";
import Loading from "./Loading";
import error from './error';
import Nerds from "./Nerds";

class NerdsList extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            nerds: [
                {
                    id: 2,
                    Operators_name: 'Pass on',
                    poster_url: 'http://bit.ly/2WnGRdu',
                    nerd_count: 2
                },
                {
                    id: 1,
                    title: 'Captain Marvel',
                    poster_url: 'http://bit.ly/2vI1c1n',
                    nerd_count: 1
                },
                {
                    id: 3,
                    title: 'Captain Marvel is a really long title',
                    poster_url: 'http://bit.ly/2vI1c1n',
                    nerd_count: 0
                }
            ],
            nerds: [],
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.fetchNerds();
    }

    fetchNerds() {
        this.setState({ loading: true, error: false });

        axios
            .get("http://localhost:9000/api/nerds")
            .get("/api/nerds")
            .then(response => {
                this.setState({
                    nerds: response.data,
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                this.setState({
                    nerds: [],
                    loading: false,
                    error: true
                });
            });
    }
    

    render() {
        const { nerds, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <error />;
        }
        return (
            <div className="ndls-container">
                <div className="ndls-nerd-list">
                    {nerds.map(n => (
                       <nerd key={n.id} nerds={n} />
                    ))}
                </div>
            </div>
        );
    }
}

export default NerdsList;