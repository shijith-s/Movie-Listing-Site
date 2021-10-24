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
      return {...state, favourites: [...state.favourites, action.data]};
    }

    case 'REMOVE_FAVOURITE': {
      console.log ('Removing from favourites');
      const favourites = state.favourites.filter (
        movie => movie.id !== action.id
      );
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
