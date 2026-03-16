
import { useParams, useLocation } from "react-router-dom"

export default function () {
    const { movie } = useParams()
    const { state } = useLocation()

    return (
        <main class="movie">
            <h1>{movie}</h1>
            <img src={state.poster} alt={movie} />
            <h3>Utgivelsesår: {state.year}</h3>
        </main>
    )
}