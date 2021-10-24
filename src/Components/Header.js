import React, {useState, useEffect} from 'react';
import '../CSS/header.css';
import axios from 'axios';
import MovieContextProvider from '../React Context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const url = process.env.REACT_APP_API_URL;

function Header () {
  const [movies, dispatch] = MovieContextProvider ();
  const [searchVal, setSearchVal] = useState ('');
  const [timer, setTimer] = useState (0);

  const searchMovies = () => {
    console.log ('searching', searchVal);
    const searchUrl = url + `s=${searchVal}`;
    console.log (searchUrl);
    axios.get (searchUrl).then (res => {
      console.log (res);
      if (res.data.Response === 'False') return;
      dispatch ({
        type: 'ADD_Movies',
        data: res.data.Search,
      });
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
      <input
        type="text"
        className="searchBar"
        placeholder="Search here..."
        value={searchVal}
        onChange={changeHandler}
      />
    </div>
  );
}

export default Header;
