import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Movie from "./Components/Movie";
import Search from "./Components/Search";
import {ReactComponent as Image }from "../src/assets/Image/background.svg"
import './Components/Body.css'


// const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; 

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  	};
    useEffect(() =>{
      search()
    },[])
    
    return (
     <div className="App">
      <Header text="MOVIE SEARCH" />
      <Search search={search} />
      <div>
        <Image/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      </div>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;

