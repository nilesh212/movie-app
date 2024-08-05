// import logo from "./logo.svg";
import { useEffect } from "react";
import "../App.css";
import { data } from "../data";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "..";
import { connect } from "react-redux";

function App(props) {
  let that = this;
  useEffect(() => {
    // const { store } = props;

    props.dispatch(addMovies(data));
    // store.subscribe(() => {
    //   that.forceUpdate(); //WE should never use this function.
    // });
  }, []);

  function isMovieFavourite(movie) {
    const { movies } = props;

    if (movies.favourites.indexOf(movie) !== -1) {
      return true;
    }
    return false;
  }

  function onChangeTab(val) {
    props.dispatch(setShowFavourites(val));
  }
  const { movies, search } = props; // {movies,search}
  const { list, favourites, showFavourites } = movies;
  const displayMovies = showFavourites ? favourites : list;
  return (
    <div className="App">
      <Navbar search={search}></Navbar>
      <div className="main">
        <div className="tabs">
          <div
            className={`tab ${showFavourites ? "" : "active-tabs"}`}
            onClick={() => {
              onChangeTab(false);
            }}
          >
            Movies
          </div>
          <div
            className={`tab ${!showFavourites ? "" : "active-tabs"}`}
            onClick={() => onChangeTab(true)}
          >
            Favourites
          </div>
        </div>
        <div className="list">
          {displayMovies.map((movie, index) => {
            return (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={props.dispatch}
                isFavourite={isMovieFavourite(movie)}
              ></MovieCard>
            );
          })}
          {displayMovies.length === 0 ? (
            <div className="no-movies">No Movies to Display!</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// export default App;

// class AppWrapper extends React.Component {}

function callback(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;
