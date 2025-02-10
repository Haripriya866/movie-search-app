import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import MovieItem from "../MovieItem";

import "./index.css";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Movie extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: "",
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { searchInput, currentPage } = this.state;
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&page=${currentPage}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDc4YWZmNDM3MTg1ZWIwOGVkZTMzM2Y1ODA3NmJlMCIsIm5iZiI6MTczOTE3MzMxMy45Niwic3ViIjoiNjdhOWFkYzEwYmY0NmY4ZTg4MGY3OTU2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Gg4saxUVGis6AWKAESFD4UKJidXb0ZVmFwMVaIgIypU`,
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const formatedData = data.results.map((eachItem) => ({
        id: eachItem.id,
        title: eachItem.title,
        postedPath: eachItem.poster_path,
        releaseDate: eachItem.release_date,
        voteAverage: Math.round(eachItem.vote_average * 10) / 10,
        overview: eachItem.overview,
      }));
      this.setState({
        moviesList: formatedData,
        apiStatus: apiStatusConstants.success,
        totalPages: data.total_pages,
      });
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  onChangeSearchInput = (event) => {
    this.setState(
      {
        searchInput: event.target.value,
        currentPage: 1, // Reset to first page when searching
      },
      this.getData
    );
  };

  renderHeader = () => {
    const { searchInput } = this.state;

    return (
      <nav className="header-container">
        <span className="movie-heading">MOVIE NAME</span>
        <input
          className="search-input"
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="Movie Name"
        />
        <button type="button" className="search-button">
          Search
        </button>
      </nav>
    );
  };

  onClickLeftButton = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage > 1 ? prevState.currentPage - 1 : 1,
      }),
      this.getData
    );
  };

  onClickRightButton = () => {
    this.setState(
      (prevState) => ({
        currentPage:
          prevState.currentPage < prevState.totalPages
            ? prevState.currentPage + 1
            : prevState.totalPages,
      }),
      this.getData
    );
  };

  renderPagination = () => {
    const { currentPage, totalPages } = this.state;
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="left-button"
          onClick={this.onClickLeftButton}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          {" "}
          Page {currentPage} of {totalPages}
        </p>
        <button
          type="button"
          className="right-button"
          onClick={this.onClickRightButton}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  renderSuccessView = () => {
    const { moviesList } = this.state;
    return (
      <>
        <ul className="list-container">
          {moviesList.map((eachMovie) => (
            <MovieItem key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
        {this.renderPagination()}
      </>
    );
  };

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="failure-heading">
        Something went wrong. Try again later.
      </h1>
    </div>
  );

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#00BFFF" width={50} height={50} />
    </div>
  );

  renderView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <div className="app-container">
          {this.renderHeader()}
          {this.renderView()}
        </div>
      </>
    );
  }
}

export default Movie;
