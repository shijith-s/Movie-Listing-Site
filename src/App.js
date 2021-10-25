import {useEffect, useState} from 'react';
import './App.css';
import Header from './Components/Header';
import MovieContextProvider from './React Context/MovieContext';
import MovieList from './Components/MovieList';
import Favourites from './Components/Favourites';

function App () {
  const [movies, dispatch] = MovieContextProvider ();
  const [fav, setFav] = useState (false);
  const toggleFav = func => {
    setFav (flag => !flag);
  };
  const closeFav = func => {
    setFav (false);
  };
  useEffect (() => {
    const fav = localStorage.getItem ('fav');
    console.log ('favourties in local');
    const parsedFav = JSON.parse (fav);
    console.log (parsedFav);
    if (parsedFav)
      dispatch ({
        type: 'ADD_FAVOURITE',
        data: parsedFav,
      });
  }, []);
  return (
    <div className="App">
      <Header toggleFav={toggleFav} closeFav={closeFav} />

      <div className="movieContent">
        {fav ? <Favourites closeFav={closeFav} /> : <MovieList />}
      </div>
    </div>
  );
}

export default App;
