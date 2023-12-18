import { useState, useEffect, useContext } from "react";
import { QueryContext } from "../contexts/contexts.js";
import * as usersAPI from '../services/usersAPI';
import sortCallback from "../utils/sortCallback.js";
import { Link } from "react-router-dom";
import "./UserList.css"
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

    const filteredAuthors = authors
        .filter(a => a && a.username && a.username.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => sortCallback(a, b, order))
        .slice(0, quantity);

    return (
        <ol className={`user-list-container `}>
            {
                filteredAuthors.length > 0 ? filteredAuthors.map(author => (
                    // console.log(author)
                    <li key={author._id} className="user-card">
                        {author.profilePicture
                            ? <img src={author.profilePicture} alt={author.username} className="user-picture" />
                            : <img src="https://res.cloudinary.com/djksghat4/image/upload/v1624350898/placeholder-image_zjxq3p.png" alt={author.username} className="user-picture" />}
                        <div className="user-info">
                            <Link to={`/authors/${author._collectionsId}`} className="user-name">{author.username}</Link>
                        </div>
                    </li>
                )) : <h2 className="empty">There are no authors</h2>
            }
        </ol>
    );
}