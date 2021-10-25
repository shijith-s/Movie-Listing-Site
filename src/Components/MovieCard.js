import React from 'react';
import '../CSS/movies.css';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieContextProvider from '../React Context/MovieContext';

function MovieCard({movieData}) {
  const [movies, dispatch] = MovieContextProvider ();
  const favAdder = () => {
    console.log ('Adding to fav', movieData.Title);
    dispatch ({
      type: 'ADD_FAVOURITE',
      data: [movieData],
    });
  };
  const favRemover = () => {
    console.log ('Removing from fav', movieData.Title);
    dispatch ({
      type: 'REMOVE_FAVOURITE',
      imdbID: movieData.imdbID,
    });
  };
  return (
    <div className="movieCard">
      {movies.favourites.find (movie => movie.imdbID === movieData.imdbID)
        ? <FavoriteIcon
            className="movieCard__favIcon favRed"
            onClick={favRemover}
            title="Remove from favourites"
          />
        : <FavoriteTwoToneIcon
            className="movieCard__favIcon"
            onClick={favAdder}
            title="Add to favourites"
          />}
      <div className="movieCard__poster">
        <img src={movieData.Poster} alt="poster" />
      </div>
      <div className="movieCard__data">
        <h3>{movieData.Title}</h3>
        <p>{movieData.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
