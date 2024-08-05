//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";

//action creators
export function addMovies(movies) {
  return {
    movies,
    type: ADD_MOVIES,
  };
}

export function addFavourite(movies) {
  return {
    movies,
    type: ADD_FAVOURITE,
  };
}

export function removeFromFavourites(movies) {
  return {
    movies,
    type: REMOVE_FROM_FAVOURITES,
  };
}

export function setShowFavourites(val) {
  return {
    val,
    type: SET_SHOW_FAVOURITES,
  };
}

export function addMovieToList(movies) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movies,
  };
}

export function handleMovieSearch(searchText) {
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=7fb71f32&t=${searchText}`;

  return function (dispatch) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((movie) => {
        dispatch(addMovieSearchResult(movie));
      });
  };
}

export function addMovieSearchResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie,
  };
}
