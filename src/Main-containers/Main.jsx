
import { useContext, useState } from "react";
import Categories from "../containers/Categories";
import RecipeList from "../containers/RecipeList";
import Heading from "../components/Heading";
import UserList from "../containers/UserList";
import { AuthContext, QueryContext } from "../contexts/contexts";
import "./Main.css"
import { Link } from "react-router-dom";
import Tags from "../containers/Tags";

export default function Main() {
    const [order, setOrder] = useState('date-descending')
    const { search, setSearch } = useContext(QueryContext)
    const { isAuthenticated } = useContext(AuthContext)
    const show = useState('all')

    return (
        <div className="site-main wrapper">
            {!search && <Categories />}
            <section className="recipes">
                <Heading content="Newest" line={false} />
                <RecipeList order={order} quantity={6} show={'all'} />
                <div className="links">
                    <Link to="/recipes">Browse ALL</Link>
                    {isAuthenticated && <Link to="/recipes/create">Create</Link>}
                </div>
            </section>
            <section className="users">
                <Heading content="Authors" line={false} />
                <UserList quantity={30} />
                <div className="links">
                    <Link to="/authors">Browse ALL</Link>
                </div>
            </section>
            <section className="tags">
                <Heading content="Or Browse By Tags" />
                <Tags/>
            </section>
        </div>
    )
}