import React from "react";
import Movie from "./Movie";

class NerdsList extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            nerds: [
                {
                    id: 2,
                    title: 'Kalank',
                    poster_url: 'http://bit.ly/2WnGRdu',
                    cinema_count: 2
                },
                {
                    id: 1,
                    title: 'Captain Marvel',
                    poster_url: 'http://bit.ly/2vI1c1n',
                    cinema_count: 1
                },
                {
                    id: 3,
                    title: 'Captain Marvel is a really long title',
                    poster_url: 'http://bit.ly/2vI1c1n',
                    cinema_count: 0
                }
            ]
        }
    };
}

render() {
    const { nerds } = this.state;
    return (
        <div className="ndls-container">
            <div className="ndls-nerd-list">
                {nerds.map(m => (
                   <nerd key={n.id} nerds={n} />
                ))}
            </div>
        </div>
    );
}

export default NerdsList;