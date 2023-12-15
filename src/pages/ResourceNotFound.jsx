import { Link } from "react-router-dom";
import Path from "../paths";
import "./ResourceNotFound.css";

export default function ResourceNotFound({what}) {
    return (
        <div className="page-wrapper">
            <h1>{what.slice(0, -1)} not found</h1>
            <h3>{'>>'}<Link to={`/${what}`}>Here is a list of all the {what}</Link>{'<<'}</h3>
            <h3>{'>>'}<Link to={Path.Home}>Or go the home page</Link>{'<<'}</h3>
        </div>
    )
}