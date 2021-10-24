import React from 'react';
import '../CSS/movies.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function MovieCard({movieData}) {
  console.log (movieData);
  const favAdder = () => {
    console.log ('Adding to fav', movieData.Title);
  };
  return (
    <div className="movieCard">
      <FavoriteBorderIcon className="movieCard__favIcon" onClick={favAdder} />
      <div className="movieCard__poster">
        <img src={movieData.Poster} alt="poster" />
      </div>
      <div className="movieCard__data">
        <h4>{movieData.Title}</h4>
        <p>{movieData.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
