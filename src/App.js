import {useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import MovieList from './Components/MovieList';
// import axios from 'axios';
// import MovieContextProvider from './React Context/MovieContext';

function App () {
  return (
    <div className="App">
      <Header />
      <MovieList />
    </div>
  );
}

export default App;
