import React, { useState } from "react";

export default function Form()  {
    const [movie, setMovie] = useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: "",
        stars: ['']
    })
    
    const handleChange = (e) => {
        e.persist();
        setMovie({[e.target.name]: e.target.value})
    }
    const submit = (e) => {
        e.preventDefault();
        setMovie({
            title: '',
        director: '',
        metascore: "",
        stars: ['']
        })
    }
return(
    <form onSubmit={submit}>
        <input type="text" name="title" placeholder="Update Title" value={movie.title} onChange={handleChange} />
        <input type="text" name="director" value={movie.director} placeholder="Update Director" onChange={handleChange} />
        <input type="text" name="metascore" value={movie.metascore} placeholder="Update Score" onChange={handleChange}/>
        <input type="text" name="stars" value={movie.stars} placeholder="Add New Actor" onChange={handleChange}/>
    </form>
)
}