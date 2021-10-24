import React, {useEffect} from 'react';
import MovieContextProvider from '../React Context/MovieContext';
import MovieCard from './MovieCard';
import '../CSS/movies.css';

function MovieList () {
  const [AllMovies] = MovieContextProvider ();
  console.log (AllMovies);
  useEffect (
    () => {
      console.log ('movieslist page');
      console.log (AllMovies);
    },
    [AllMovies]
  );

  const searchedMovies = AllMovies.movies;
  return (
    <div className="movieList">
      {searchedMovies.length > 0
        ? searchedMovies.map ((movie, idx) => (
            <MovieCard key={idx} movieData={movie} />
          ))
        : <h2>Search for movies...</h2>}
    </div>
  );
}

export default MovieList;
