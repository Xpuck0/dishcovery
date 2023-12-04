
import { useContext, useState } from "react";
import Categories from "../containers/Categories";
import RecipeList from "../containers/RecipeList";
import Heading from "../components/Heading";
import UserList from "../containers/UserList";
import { QueryContext } from "../contexts/contexts";
import "./Main.css"
import { Link } from "react-router-dom";

export default function Main() {
    const [order, setOrder] = useState('date-descending')
    const {search, setSearch }= useContext(QueryContext)
    const show = useState('none')

    return (
        <div className="site-main wrapper">
            {!search && <Categories />}
            <section className="recipes">
                <Heading content="Newest" line={false} />
                <RecipeList order={order} quantity={30} show={show}/>
                <div className="links">
                    <Link to="/recipes">Browse ALL</Link>
                    <Link to="/recipes/create">Create</Link>
                </div>
            </section>
            {/* <section className="users">
                <Heading content="Authors" line={false} />
                <UserList quantity={30} />
                <div className="links">
                    <Link to="/authors">Browse ALL</Link>
                </div>
            </section> */}
        </div>
    )
}