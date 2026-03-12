import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Movies() {

    const [movies, setMovies] = useState([])
    const apiKey = import.meta.env.VITE_APP_API_KEY

    const getAllMovies = async (page = 1) => { //Får ut alle filmer i den første arrayen
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=star&type=movie&page=${page}`);
        const data = await response.json()

        setMovies(data.Search)
        console.log(data.Search)
    }
    useEffect(() => {
        getAllMovies()

    }, [])

    return (
        <main>
            <h1>Movies</h1>
            <section>
                {/* {movies?.map((mov, i) => <MovieCard key={i} title={mov.Title} />)} */}
                {movies?.map((mov) => <MovieCard key={mov.imdbID} title={mov.Title} year={mov.Year} poster={mov.Poster} />)}
            </section>
        </main>
    )
}