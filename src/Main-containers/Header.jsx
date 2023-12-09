import { Link } from 'react-router-dom';
import './Header.css';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext, QueryContext } from '../contexts/contexts';
import Path from '../paths';


export default function Header({ hideQuery }) {

    const [displayStats, setDisplayStats] = useState(false)
    const { userId, username, email, isAuthenticated } = useContext(AuthContext);
    const { search, setSearch } = useContext(QueryContext)

    const changeHandler = (e) => {
        setSearch(e.target.value);
    }

    const resetHandler = (e) => {
        setSearch('')
    }

    const toggleDropDown = (e) => {
        setDisplayStats(o => !o);
    }

    return (
        <div className="site-header">
            <Link to={'/'}><h1 className="logo">dishcovery</h1></Link>
            {!hideQuery ?
                <form className="searchbar-wrapper">
                    <input type="text" name="Searchbar" id="search" value={search} onChange={changeHandler} placeholder="🔎   Search recipes and chefs" />
                    <svg
                        onClick={resetHandler}
                        className="backspace"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="grey"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                        />
                    </svg>

                </form>
                :
                <nav className="navigation">
                    <ul className="nav-list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                        <li><Link to="/authors">Authors</Link></li>
                    </ul>
                </nav>
            }
            {
                !isAuthenticated ? (
                    <div className="auth-buttons">
                        <p className='login'><Link to="/login">Log in</Link></p>
                        <p className='signup'><Link to="/signup">Sign up</Link></p>
                    </div>
                ) : (
                    <div className="profile">
                        <p onClick={toggleDropDown} className="name">{username}</p>
                        <nav>
                            <ul className={`dropdown ${displayStats == false ? 'hide' : 'show'}`}>
                                <li><Link to={`/authors/${userId}`}>Profile</Link></li>
                                <li><Link to={Path.Logout}>Logout</Link></li>
                                <li><Link to={Path.Settings}>Settings</Link></li>
                                <li><button onClick={toggleDropDown} type="button">Close ❌</button></li>
                            </ul>
                        </nav>
                    </div>
                )
            }

        </div>
    )
}