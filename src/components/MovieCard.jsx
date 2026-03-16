import { Link } from "react-router-dom"

export default function MovieCard({ title, year, poster }) {
    const slug = title
    const missingImg = 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='

    return (

        < article className="movie-card" >
            <Link to={`/${slug}`} state={{ title, year, poster }}>
                <h3>{title}</h3>
                <p>{year}</p>
                <img
                    src={poster === "N/A" ? missingImg : poster}
                    alt={title}
                    onError={(e) => {
                        e.target.src = missingImg
                    }}
                />
            </Link>
        </article>
    )
}

//Tok det fra Rick and Morty og satt inn et "not found" bilde når bilde til apien ikke funket