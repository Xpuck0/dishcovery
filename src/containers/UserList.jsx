import { useState, useEffect, useContext } from "react";
import { QueryContext } from "../contexts/contexts.js";
import * as usersAPI from '../services/usersAPI';
import sortCallback from "../utils/sortCallback.js";
import { Link } from "react-router-dom";
import "./List.css"

export default function UserList({
    order,
    quantity
}) {
    const [authors, setAuthors] = useState([]);
    const { query } = useContext(QueryContext)

    useEffect(() => {
        const fetchData = async () => {
            const data = await usersAPI.getAllUsers();
            setAuthors(data);
        }
        fetchData();
    }, []);

    return (
        <ol className="authors-list list">
            {
                authors.length > 0
                    ? authors.sort((a, b) => sortCallback(a, b, order)).slice(0, quantity).filter(a => a && a.username && a.username.toLowerCase().includes(query.toLowerCase())).map(author => (
                        // console.log(author)
                        <li key={author._id} className="author item">
                            <Link  to={`/authors/${author._id}`}>{author.username}</Link>
                        </li>
                    ))
                    : <h1 className="error">There are no authors!</h1>
            }
        </ol>
    );
}