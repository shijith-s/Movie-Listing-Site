import React from 'react';
import '../CSS/movies.css';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieContextProvider from '../React Context/MovieContext';
import ErrorImg from '../Images/404Error.jpg';

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
        ? <span title="Remove from favourites">
            {' '}
            <FavoriteIcon
              className="movieCard__favIcon favRed"
              onClick={favRemover}
            />
          </span>
        : <span title="Add to favourites">
            <FavoriteTwoToneIcon
              className="movieCard__favIcon"
              onClick={favAdder}
            />
          </span>}
      <div className="movieCard__poster">
        <img
          src={movieData.Poster}
          alt="poster"
          onError={e => {
            e.target.src = ErrorImg;
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="movieCard__data">
        <h3>{movieData.Title}</h3>
        <p>{movieData.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
