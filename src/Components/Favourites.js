import React, {useRef} from 'react';
import MovieContextProvider from '../React Context/MovieContext';
import MovieCard from './MovieCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Favourites({closeFav}) {
  const [AllMovies] = MovieContextProvider ();
  const FavMovies = AllMovies.favourites;

  return (
    <div className="favourites">
      <div className="favourites__heading">
        <ArrowBackIcon onClick={closeFav} className="favourites__back" />
        <h2>Favourites</h2>
      </div>
      <div className="favourites_list">
        {FavMovies.length > 0
          ? FavMovies.map ((movie, idx) => (
              <MovieCard key={idx} movieData={movie} />
            ))
          : <h2>No Favourites in your List</h2>}
      </div>
    </div>
  );
}

export default Favourites;
