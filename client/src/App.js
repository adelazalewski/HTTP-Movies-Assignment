import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from 'axios';
import AddMovieForm from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
//console.log(movieList);
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/"
        render={props => <MovieList {...props} movies={movieList} />} />
      

      <Route path="/movies/:id"
        render={(props) => <Movie {...props} addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList} />} />
      
      <Route path="/update-movie/:id"
        render={(props) => <UpdateMovie {...props} movieList={movieList} setMovieList={setMovieList} />} />
      
      <Route path="/add-movie"
        render={(props) => <AddMovieForm {...props} setMovieList={setMovieList}/>} />
      
    </>
  );
};

export default App;
