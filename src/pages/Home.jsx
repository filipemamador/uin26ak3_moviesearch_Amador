import { useEffect, useState } from "react"
import History from "../components/History"
import MovieCard from "../components/MovieCard"
import Search from "../components/SearchForm"
import Movies from "./Movies"


export default function Home() {
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [bondMovies, setBondMovies] = useState([])
    const [movies, setMovies] = useState([])
    const [error, setError] = useState("")

    /* Dette fikk vi fra forelesningen*/
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    //gjør sånn
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        localStorage.setItem("search", JSON.stringify(history))

    }
        , [history])

    const getMovies = async () => {
        try {
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            // console.log(data)
            if (data.Search) {
                setMovies(data.Search)
            } else { setMovies([]) }
        }
        catch (err) {
            console.error(err);
        }
    }


    const handleChange = (e) => {
        const value = e.target.value
        setSearch(value)
        //if tester for søkefeltet

        if (value.length === 0) { //viser ingenting hvis søkefeltet er tom
            setError("")
            setMovies([])
            return
        }
        if (value.length >= 4) { //Søker kun når brukerene tastetr inn 4 eller flere tegn
            setError("")
            getMovies(value)

        }

        else {
            setError("Du må skrive minst 4 tegn")
            setMovies([])
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])


    }
    //Få ut alle bond filmer
    const getBondMovies = async () => {
        //Jeg fikk ikke til å funke ved å bruke baseUrl så gjorde jeg på denne måtten som jeg fikk fra chatGPT
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=James Bond&type=movie`)
        const data = await response.json()

        if (data.Search) {
            setBondMovies(data.Search)
        }

    }
    useEffect(() => {
        getBondMovies()
    }, [])



    return (
        <>
            <header>
                <h1>Home</h1>

                <form onSubmit={handleSubmit}>
                    <label>
                        Søk etter film:
                        <input type="search" placeholder="Harry Potter" onChange={handleChange} onFocus={() => setFocused(true)} /*onBlur={() => setFocused(false)}*/></input>
                    </label>
                    {focused ?
                        <History history={history} setSearch={setSearch} /> : null}
                    <button onClick={getMovies}>Søk</button>
                </form>
            </header>
            <main>
                {error && <p>{error}</p>}
                {movies.length > 0
                    ? movies.map(movie => (
                        <MovieCard key={movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                    ))
                    : bondMovies.map(movie => (
                        <MovieCard key={movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                    ))
                }
            </main>
        </>
    )
}