import Header from "../Main-containers/Header"
import { useState, useEffect } from "react";
import * as recipeAPI from "../services/recipesAPI";
import RecipeCard from "../components/RecipeCard";
import RecipeList from "../containers/FunctionalRecipeList";

export default function RecipesPage() {
    const [form, setForm] = useState({
        criteria: 'date',
        order: 'descending' 
    })

    const changeHandler = (e) => {
       
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Header />
            <div className="recipe-list">
                <div className="header-wrapper">
                    <h2>List of all the recipes</h2>
                </div>
                <div className="line"></div>

                <div className="filter-container">
                    <p>Filter</p>
                    <form>
                        <div className="filter-menu"></div>
                        <select name="criteria" id="order" value={form.criteria} onChange={changeHandler}>
                            <option value="likes">Likes</option>
                            <option value="date">Date</option>
                            <option value="name">Name</option>
                        </select>
                        <fieldset>
                            <label htmlFor="ascending"><input type="radio" name="order" checked={form.order == "ascending"} value="ascending" onChange={changeHandler} />Ascending</label>
                            <label htmlFor="descending"><input type="radio" name="order" checked={form.order == "descending"} value="descending" onChange={changeHandler} />Descending</label>
                        </fieldset>
                    </form>
                </div>

                {/* <FunctionalRecipeList order={state.order} quantity={state.quantity} /> */}
                <RecipeList order={`${form.criteria}-${form.order}`} quantity={-1} />

                <ul className="recipes">



                </ul>
            </div>
        </>
    )
}