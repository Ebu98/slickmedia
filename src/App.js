import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Movie from "./Components/Movie";
import Search from "./Components/Search";
import Image from "../src/assets/Image/background.svg"
import Logo from "../src/assets/Image/logo.svg"
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
      <Header logo={Logo} />
      
      <div className="image-container">
        <img src={Image} alt="" maxWidth="1440px" width=" 100%" position="absolute" />
      <p className="App-intro">Watch something incredible.</p>
      </div>
      <Search search={search} />
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

