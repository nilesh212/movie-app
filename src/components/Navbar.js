import React from "react";
import { StoreContext } from "..";
import { handleMovieSearch, addMovieToList } from "../actions";
// import { connect } from "..";
import { connect } from "react-redux";
// import { data } from "../data";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isSearching: false,
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
    this.setState({ isSearching: false });
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
      isSearching: true,
    });
    //Making Debounce calls to reduce api calls.
    if (!this.state.isSearching) {
      setTimeout(this.handleSearch, 500);
    }
  };

  render() {
    // const { showSearchResults } = this.state;
    const { result: movie, showSearchResults } = this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input onKeyUp={this.handleChange}></input>
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic"></img>
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// export default Navbar;

function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(mapStateToProps)(Navbar);
