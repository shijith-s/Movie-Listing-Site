import React, { createContext, useReducer, useContext } from "react";
import reducer, { initialState } from "./Reducer";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => (
  <MovieContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </MovieContext.Provider>
);

const MovieContextProvider = () => useContext(MovieContext);

export default MovieContextProvider;
