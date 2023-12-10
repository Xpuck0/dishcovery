import { Link } from "react-router-dom";
import Header from "../Main-containers/Header"
import { useState, useEffect, useContext } from "react";
import * as recipeAPI from "../services/recipesAPI";
import RecipeCard from "../components/RecipeCard";
import RecipeList from "../containers/RecipeList";
import "./RecipesPage.css"
import Heading from "../components/Heading";
import Path from "../paths";
import { AuthContext } from "../contexts/contexts";
// import Footer from "../Main-containers/Footer";

export default function RecipesPage() {
    const [form, setForm] = useState({
        criteria: 'date',
        order: 'descending'
    })
    const [showForm, setShowForm] = useState(false);
    const {isAuthenticated} = useContext(AuthContext);

    const changeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const showHideHandler = () => {
        setShowForm(!showForm)
    }

    return (
        <>
            <Header />
            <Heading content={"All recipes"} />
            <div className="recipes-wrapper">
                <div className="filter-container">
                    <button onClick={showHideHandler}>Filter</button>


                    {showForm && <form className="form">
                        <div className="filter-menu">
                            <select name="criteria" id="critieria" value={form.criteria} onChange={changeHandler}>
                                <option value="likes">Likes</option>
                                <option value="date">Date</option>
                                <option value="name">Name</option>
                            </select>
                            <select name="order" id="order" value={form.order} onChange={changeHandler}>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </form>}
                </div>


                <div className="recipe-page-list">

                    <RecipeList order={`${form.criteria}-${form.order}`} quantity={-1} show="all" />

                </div>
                {isAuthenticated && <Link className="create-btn" to={Path.CreateRecipe}>Create Recipe</Link>}

            </div>

        </>
    )
}