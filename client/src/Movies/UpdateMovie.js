import axios from "axios";
import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";


export default function UpdateMovie() {
    const params = useParams();
    const {push} = useHistory();
    //console.log(params);
    const [movie, setMovie] = useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: "",
        stars: ['']
    })
    const handleChange = (e) => {
        e.persist();
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
        });
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
            console.log("update movie res: ", res);
            push("/");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <>
        <form onSubmit={submit}>
        <input type="text" name="title" placeholder="Update Title" value={movie.title} onChange={handleChange} />
        <input type="text" name="director" value={movie.director} placeholder="Update Director" onChange={handleChange} />
        <input type="text" name="metascore" value={movie.metascore} placeholder="Update Score" onChange={handleChange}/>
        <input type="text" name="stars" value={movie.stars} placeholder="Add New Actor" onChange={handleChange}/>
        <button>Update Movie</button>
    </form>
        
        </>
    )
}