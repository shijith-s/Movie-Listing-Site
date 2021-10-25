import React, {useEffect, useState, useRef} from 'react';
import MovieContextProvider from '../React Context/MovieContext';
import MovieCard from './MovieCard';
import '../CSS/movies.css';
import axios from 'axios';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const url = process.env.REACT_APP_API_URL;

function MovieList () {
  const [AllMovies, dispatch] = MovieContextProvider ();
  const BackToTop = useRef ();
  console.log (AllMovies);

  const page = AllMovies.page;
  const searchVal = AllMovies.searchVal;
  console.log (searchVal);

  const getMovies = () => {
    if (searchVal === '') {
      return;
    }
    const searchUrl = url + `s=${searchVal}&page=${page}`;
    console.log (searchUrl);
    axios.get (searchUrl).then (res => {
      console.log (res);
      if (res.data.Response === 'False') {
        return;
      }
      dispatch ({
        type: 'ADD_MORE_MOVIES',
        data: res.data.Search,
      });
    });
  };

  window.onscroll = function () {
    paginationFunc ();
  };

  function paginationFunc () {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    if (winScroll === height) {
      if (page === 100) return;
      dispatch ({
        type: 'INCREMENT_PAGES',
      });
      getMovies ();
    }
  }

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  window.addEventListener ('scroll', () => {
    if (BackToTop.current) {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        BackToTop.current.style.display = 'block';
      } else {
        BackToTop.current.style.display = 'none';
      }
    }
  });

  const searchedMovies = AllMovies.movies;
  return (
    <div className="movies">
      {searchedMovies.length > 0
        ? <div className="movieList">
            {searchedMovies.map ((movie, idx) => (
              <MovieCard key={idx} movieData={movie} />
            ))}
          </div>
        : <h2 className="hometext">
            Get your favourite movies on your fingertips...
          </h2>}
      <div ref={BackToTop} className="backToTop" onClick={backToTop}>
        <ArrowUpwardIcon style={{fontSize: '30px'}} />
      </div>
    </div>
  );
}

export default MovieList;
