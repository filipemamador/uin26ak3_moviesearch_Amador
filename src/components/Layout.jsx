import { Link } from "react-router-dom"

export default function Layout({ children }) {

    return (
        <>
            <nav>
                <Link to="/">Hjem</Link>
                <Link to="Movies">Movies</Link>
            </nav>
            {children}
        </>
    )
}
// Basically copiert fra Rick and Morty whorkshop