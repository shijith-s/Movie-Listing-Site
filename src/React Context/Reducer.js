export const initialState = {
  movies: [],
  favourites: [],
  searchVal: '',
};

const reducer = (state, action) => {
  console.log (action);
  switch (action.type) {
    case 'ADD_SEARCH': {
      console.log ('Adding search val');
      console.log (action.data);
      return {...state, searchVal: action.data};
    }
    case 'ADD_MOVIES': {
      console.log ('Adding movies');
      console.log ({...state, movies: action.data});
      return {...state, movies: action.data};
    }
    case 'ADD_MORE_MOVIES': {
      console.log ('Adding more movies');
      const moreMovies = {...state, movies: [...state.movies, ...action.data]};
      console.log (moreMovies);
      return moreMovies;
    }
    case 'REMOVE_MOVIES': {
      console.log ('Removing movies');
      return {...state, movies: []};
    }
    case 'ADD_FAVOURITE': {
      console.log ('Ading to favourites');
      const newFav = [...state.favourites, ...action.data];
      localStorage.setItem ('fav', JSON.stringify (newFav));
      return {...state, favourites: newFav};
    }

    case 'REMOVE_FAVOURITE': {
      console.log ('Removing from favourites');
      const favourites = state.favourites.filter (
        movie => movie.imdbID !== action.imdbID
      );
      console.log ('after removal', favourites);
      localStorage.setItem ('fav', JSON.stringify (favourites));
      return {
        ...state,
        favourites: favourites,
      };
    }
    default:
      return state;
  }
};

export default reducer;
