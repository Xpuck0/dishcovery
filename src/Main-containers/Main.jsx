
import { useContext, useState } from "react";
import Categories from "../containers/Categories";
import RecipeList from "../containers/RecipeList";
import Heading from "../components/Heading";
import UserList from "../containers/UserList";
import { QueryContext } from "../contexts/queryContext";
import "./Main.css"
import { Link } from "react-router-dom";

export default function Main() {
    const [order, setOrder] = useState('date-descending')
    const search = useContext(QueryContext)

    return (
        <div className="site-main wrapper">
            {!search && <Categories />}
            <section className="recipes">
                <Heading content="Newest" line={true} />
                <RecipeList order={order} quantity={30} />
                <div className="links">
                    <Link to="/recipes">Browse ALL</Link>
                    <Link to="/recipes/create">Create</Link>
                </div>
            </section>
            <section className="users">
                <Heading content="Authors" line={true} />
                <UserList quantity={30} />
                <div className="links">
                    <Link to="/authors">Browse ALL</Link>
                </div>
            </section>
        </div>
    )
}