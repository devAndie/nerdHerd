return (
    <div className="mvls-container">
        <div className="mvls-movie-list">
            {moviesShowing.map(m => (
                <Movie key={m.id} movieShowing={m} />
            ))}
        </div>
    </div>
);