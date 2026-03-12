export default function MovieCard({ title, year, poster }) {
    //const { title, year, poster } = mov

    return (

        <article>
            <h3>{title}</h3>
            {<p>{year}</p>}
            {<img src={poster} alt={title} />}

        </article>
    )
}