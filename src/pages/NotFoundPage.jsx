import { Link } from "react-router-dom"
import Path from "../paths"
import "./NotFoundPage.css"

export default function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <p>Page not found</p>

            <Link to={Path.Home}>Home</Link>
        </div>

    )
}