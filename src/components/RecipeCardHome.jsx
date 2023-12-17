import { Link } from "react-router-dom";
import Path from "../paths";
import "./RecipeCardHome.css";

export default function RecipeCardHome({r}) {

    return (
        <div className="recipe-card-home">
            <div className={`img-wrapper ${r.images.length == 0 ? 'broken': ''}`}>
                <img src={r.images?.length > 0 ? r.images[0] :''} alt={r.description} />
            </div>
            <p><Link to={`${Path.Recipes}/${r._id}`}>{r.title}</Link></p>
        </div>
    )
}