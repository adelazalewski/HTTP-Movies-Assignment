import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function AddMovieForm(props) {
    const history = useHistory();
    const [movie, setMovie] = useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: "",
        stars: [""]
    })
    
    const handleChange = (e) => {
        e.persist();
        // if(e.target.name === "stars"){
        //     movie.stars.toString();
        //     setMovie({
        //         ...movie,
        //         [movie.stars]:e.target.value.toString(),
                
        //     })
        // }else{
        setMovie({...movie,
            [e.target.name]: e.target.value})
    }
    const submit = (e) => {
        e.preventDefault();
        setMovie({
            title: '',
        director: '',
        metascore: "",
        stars: ['']
        })
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log("post request res: ", res);
            props.setMovieList(res.data);
            history.push("/");
        })
        .catch(err => console.log(err))
    }
return(
    <form onSubmit={submit}>
        <input type="text" name="title" placeholder="Update Title" value={movie.title} onChange={handleChange} />
        <input type="text" name="director" value={movie.director} placeholder="Update Director" onChange={handleChange} />
        <input type="text" name="metascore" value={movie.metascore} placeholder="Update Score" onChange={handleChange}/>
        <input type="text" name="stars" value={movie.stars} placeholder="Add New Actor" onChange={handleChange}/>
        <button>Add Movie</button>
    </form>
)
}