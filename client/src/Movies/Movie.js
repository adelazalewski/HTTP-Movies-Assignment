import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")
  const params = useParams();
  const {push} = useHistory();
  console.log(params);
console.log(movie);
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
const deleteMovie = (e) => {
e.preventDefault();
axios.delete(`http://localhost:5000/api/movies/${params.id}`)
.then((res) => {
  console.log("delete request res: ",res);
  
  setSuccessMessage(res.statusText);
  
push("/");
})
.catch(err => {
  console.log(err);
})

}

const movieToUpdateMovieForm = () => {
  push(`/update-movie/${params.id}`);
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={movieToUpdateMovieForm}>
        Update Movie
      </button>
      <button onClick={deleteMovie}>
        Delete Movie
      </button>
      {successMessage ? <p>Delate: {successMessage}</p> : null}
    </div>
  );
}

export default Movie;
