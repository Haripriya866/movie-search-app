import "./index.css";

const MovieItem = (props) => {
  const { movieDetails } = props;
  const { postedPath, title, releaseDate, voteAverage, overview } =
    movieDetails;
  return (
    <li className="list-item">
      <img
        alt="movie-url"
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${postedPath}`}
      />
      <div className="movie-content-text">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-release-date">RELEASE DATE: {releaseDate}</p>
        <p className="movie-rating">RATING: {voteAverage}</p>
        <p className="movie-overview">{overview}</p>
      </div>
    </li>
  );
};

export default MovieItem;
