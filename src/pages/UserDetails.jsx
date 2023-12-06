import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, getUserByCollectionId } from "../services/usersAPI";
import Heading from "../components/Heading";
import RecipeList from "../containers/RecipeList";
import Footer from "../Main-containers/Footer";
import "./UserDetails.css"

export default function UserDetails() {
    const [user, setUser] = useState({});
    const { id } = useParams()

    useEffect(() => {
        async function get(id) {
            console.log(id)
            const r = await getUser(id)
            setUser(r);
        }

        get(id);
    }, [])

    const clickHandler = (e) => {
        const a = e.target;
        a.textContent == "Follow" ? a.textContent = "Following" : a.textContent = "Follow";
    }

    return (
        <>

            <div className="user-details wrapper">
                <div className="profile">
                    <div className="img-container">
                        <img src={user.profilePicture} alt={`${user.username}'s profile picture`} />
                    </div>
                    <h1 className="name">{user.username}</h1>
                    <button className="follow" onClick={clickHandler}>Follow</button>
                </div>

                <Heading  content="Recipes" />
                <div className="recipes">
                    <RecipeList owner_id={id} />
                </div>
            </div>
            <Footer />
        </>

    )
}