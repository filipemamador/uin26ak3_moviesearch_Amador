export default function MovieCard(mov) {
    const { title, year, poster } = mov

    return (

        <article>
            <h1>{title}</h1>
            <p>{year}</p>
            <img src={poster} alt={title} />

        </article>
    )
}