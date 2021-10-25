import React, {useState, useEffect, useRef} from 'react';
import '../CSS/header.css';
import axios from 'axios';
import MovieContextProvider from '../React Context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const url = process.env.REACT_APP_API_URL;

function Header({toggleFav, closeFav}) {
  const [movies, dispatch] = MovieContextProvider ();
  const [searchVal, setSearchVal] = useState ('');
  const [timer, setTimer] = useState (0);
  const loader = useRef ();
  const searchBar = useRef ();

  const searchMovies = () => {
    console.log ('searching', searchVal);
    if (searchVal === '') {
      dispatch ({
        type: 'REMOVE_MOVIES',
      });
      return;
    }
    if (loader.current) loader.current.style.display = 'block';
    const searchUrl = url + `s=${searchVal}`;
    console.log (searchUrl);
    axios
      .get (searchUrl)
      .then (res => {
        console.log (res);
        if (loader.current) loader.current.style.display = 'none';
        if (res.data.Response === 'False') {
          if (loader.current) {
            loader.current.style.display = 'block';
            loader.current.innerHTML = '<h4>No results found</h4>';
            setTimeout (() => {
              loader.current.style.display = 'none';
              loader.current.innerHTML = '<h4>Searching...</h4>';
            }, 1500);
          }
          return;
        }
        openSearch ();
        dispatch ({
          type: 'ADD_MOVIES',
          data: res.data.Search,
        });
        dispatch ({
          type: 'ADD_SEARCH',
          data: searchVal,
        });
      })
      .catch (err => {
        console.log ('some error occured');
        console.log (err);
        if (loader.current) {
          loader.current.style.display = 'block';
          loader.current.innerHTML = '<h4>Some error occured</h4>';
          setTimeout (() => {
            loader.current.style.display = 'none';
            loader.current.innerHTML = '<h4>Searching...</h4>';
          }, 1500);
        }
      });
  };

  useEffect (
    () => {
      if (timer) clearTimeout (timer);
      setTimer (setTimeout (searchMovies, 2000));
      return () => {
        clearTimeout (timer);
      };
    },
    [searchVal]
  );

  const changeHandler = e => {
    setSearchVal (e.target.value);
  };

  const openSearch = () => {
    if (searchBar.current) {
      if (searchBar.current.classList.contains ('searchBar__offsetShow'))
        searchBar.current.classList.remove ('searchBar__offsetShow');
      else searchBar.current.classList.add ('searchBar__offsetShow');
    }
  };

  return (
    <div className="header">
      <h2>MyFlix</h2>
      <div className="header__left">
        <span title="Favourites">
          <FavoriteIcon className="header__favIcon" onClick={toggleFav} />
        </span>
        <div ref={searchBar} className="searchBar__offset">
          <input
            type="text"
            className="searchBar"
            placeholder="Search here..."
            value={searchVal}
            onChange={changeHandler}
            onFocus={closeFav}
          />
        </div>

        <span title="Search movies">
          <SearchIcon className="header__searchIcon" onClick={openSearch} />
        </span>
      </div>
      <div ref={loader} className="loader">
        <h4>Searching...</h4>
      </div>
    </div>
  );
}

export default Header;
