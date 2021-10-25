export const initialState = {
  movies: [],
  favourites: [],
};

const reducer = (state, action) => {
  console.log (action);
  switch (action.type) {
    case 'ADD_Movies': {
      console.log ('Adding movies');
      console.log ({...state, movies: action.data});
      return {...state, movies: action.data};
    }
    case 'ADD_FAVOURITE': {
      console.log ('Ading to favourites');
      const newFav = [...state.favourites, ...action.data];
      localStorage.setItem ('fav', JSON.stringify(newFav));
      return {...state, favourites: newFav};
    }

    case 'REMOVE_FAVOURITE': {
      console.log ('Removing from favourites');
      const favourites = state.favourites.filter (
        movie => movie.imdbID !== action.imdbID
      );
      console.log ('after removal', favourites);
      localStorage.setItem ('fav', JSON.stringify(favourites));
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
