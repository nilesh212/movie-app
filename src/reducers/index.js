import { combineReducers } from "redux";

import {
  ADD_MOVIES,
  ADD_FAVOURITE,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
} from "../actions";

const intialMovieState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export function movies(state = intialMovieState, action) {
  if (action.type === ADD_MOVIES) {
    return { ...state, list: action.movies };
  } else if (action.type === ADD_FAVOURITE) {
    return { ...state, favourites: [action.movies, ...state.favourites] };
  } else if (action.type === REMOVE_FROM_FAVOURITES) {
    const filteredArray = state.favourites.filter(
      (movie) => movie.Title !== action.movies.Title
    );
    return { ...state, favourites: filteredArray };
  } else if (action.type === SET_SHOW_FAVOURITES) {
    return { ...state, showFavourites: action.val };
  } else if (action.type === ADD_MOVIE_TO_LIST) {
    return { ...state, list: [action.movies, ...state.list] };
  }
  return state;
}

const intialSearchState = {
  results: [],
  showSearchResults: false,
};

export function search(state = intialSearchState, action) {
  if (action.type === ADD_SEARCH_RESULT) {
    return {
      state,
      result: action.movie,
      showSearchResults: true,
    };
  } else if (action.type === ADD_MOVIE_TO_LIST) {
    return { ...state, showSearchResults: false };
  }
  return state;
}

// const intialRootState = {
//   intialMovieState,
//   intialSearchState,
// };

//Below rootReducer function is available for us as a combineReducer function
// export default function rootReducer(state = intialRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }

export default combineReducers({ movies, search });
