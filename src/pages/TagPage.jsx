import { useState, useEffect } from "react";
import { getAllRecipes } from "../services/recipesAPI";

import Header from "../Main-containers/Header";
import { useParams } from "react-router-dom";
import RecipeList from "../containers/RecipeList";
import Heading from "../components/Heading";
import Tags from "../containers/Tags";
import Footer from "../Main-containers/Footer";
import "./TagPage.css";

export default function TagPage() {
    const [recipes, setRecipes] = useState([]);
    const { tag } = useParams();

    return (
        <>
            <div className="tags-page">
                <Header hideQuery={true} />
                <Heading content={tag} />
                <div className="list-wrapper">
                    <RecipeList tag={tag} show="all" />
                </div>
                <Heading content="Other Tags" />
                <Tags tag={tag} />
            </div>
            <Footer />
        </>
    )
}