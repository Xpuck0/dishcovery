import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as recipeAPI from "../services/recipesAPI";
import "./Tags.css"

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await recipeAPI.getAllRecipes();

      const allTags = recipes.reduce((tags, recipe) => {
        return tags.concat(recipe.tags);
      }, []);

      // Creating an array of unique tags
      const uniqueTags = [...new Set(allTags)];
      setTags(uniqueTags);

      setDataFetched(true);
    };

    fetchData();
  }, []);

  if (!dataFetched) {
    return null;
  }

  return (
    <ul className="tags-container">
      {tags.map((el, i) => (
        <li key={`${el}${i}`}>
          <Link to={`/tags/${el}`}>{el}</Link>
        </li>
      ))}
    </ul>
  );
}