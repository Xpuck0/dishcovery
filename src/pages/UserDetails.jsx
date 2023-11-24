import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/usersAPI";
import Heading from "../components/Heading";
import RecipeList from "../containers/RecipeList";

export default function UserDetails () {
    const [user, setUser] = useState({});
    const { id } = useParams()

    useEffect(() => {
        async function get(id) {
            const r = await getUser(id)
            setUser(r);
        }

        get(id);
    }, [])

    const clickHandler =(e) => {

    }

    return (
        <div className="user-details">
            <div className="profile">
                <div className="img-container">
                    <img src={user.profilePicture} alt={`${user.username}'s profile picture`} />
                </div>
                <h1 className="name">{user.username}</h1>
                <button className="follow" onClick={clickHandler}></button>
            </div>
            <Heading content="Recipes" />
            <RecipeList owner_id={id}/>
            <h1>HIII</h1> 
        </div>
    )
}