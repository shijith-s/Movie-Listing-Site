import React, {useState, useEffect, useRef} from 'react';
import '../CSS/header.css';
import axios from 'axios';
import MovieContextProvider from '../React Context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const url = process.env.REACT_APP_API_URL;

function Header({toggleFav, closeFav}) {
  const [movies, dispatch] = MovieContextProvider ();
  const [searchVal, setSearchVal] = useState ('');
  const [timer, setTimer] = useState (0);
  const loader = useRef ();

  const searchMovies = () => {
    console.log ('searching', searchVal);
    if (loader.current) loader.current.style.display = 'block';
    const searchUrl = url + `s=${searchVal}`;
    console.log (searchUrl);
    axios
      .get (searchUrl)
      .then (res => {
        console.log (res);
        if (loader.current) loader.current.style.display = 'none';
        if (res.data.Response === 'False') return;
        dispatch ({
          type: 'ADD_Movies',
          data: res.data.Search,
        });
      })
      .catch (err => {
        console.log (err);
      });
  };

  useEffect (
    () => {
      if (timer) clearTimeout (timer);
      if (searchVal !== '') setTimer (setTimeout (searchMovies, 2000));
      return () => {
        clearTimeout (timer);
      };
    },
    [searchVal]
  );

  const changeHandler = e => {
    setSearchVal (e.target.value);
  };

  return (
    <div className="header">
      <h2>MyFLix</h2>
      <div className="header__left">
        <FavoriteIcon className="header__favIcon" onClick={toggleFav} />
        <input
          type="text"
          className="searchBar"
          placeholder="Search here..."
          value={searchVal}
          onChange={changeHandler}
          onFocus={closeFav}
        />
      </div>
      <div ref={loader} className="loader">
        <h4>Searching...</h4>
      </div>
    </div>
  );
}

export default Header;
