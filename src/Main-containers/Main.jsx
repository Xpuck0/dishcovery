import Categories from "../containers/Categories";
import RecipeList from "../containers/RecipeList";

export default function Main() {
    return (
        <div className="site-main">
            <Categories />
            <RecipeList content="Most popular" />
            <RecipeList content="Recently added" />
        </div>
    )
}