import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, getUserByCollectionId } from "../services/usersAPI";
import Heading from "../components/Heading";
import Header from "../Main-containers/Header"
import RecipeList from "../containers/RecipeList";
import Footer from "../Main-containers/Footer";
import "./UserDetails.css"
import { AuthContext } from "../contexts/contexts";

export default function UserDetails() {
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { id } = useParams()

    useEffect(() => {
        async function get(id) {
            const r = await getUserByCollectionId(id)
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
            <Header hideQuery={true} />
            <div className="user-details wrapper">
                <div className="profile">
                    <div className="img-container">
                        <img src={user.profilePicture} alt={`${user.username}'s profile picture`} />
                    </div>
                    <h1 className="name">{user.username}</h1>
                    {isAuthenticated && user._id != userId && <button className="follow" onClick={clickHandler}>Follow</button>}
                </div>

                <Heading content="Recipes" />
                <div className="recipes">
                    <RecipeList owner_id={id} show={'all'}/>
                </div>

                <Heading content="Recipes Liked By User" />
                <div className="liked-recipes">
                    <RecipeList liked_by={user._collectionsId} show={'all'} />
                </div>
            </div>
            <Footer />
        </>

    )
}