import { Link } from 'react-router-dom';
import './Header.css';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext, QueryContext } from '../contexts/contexts';
import Path from '../paths';


export default function Header({ hideQuery }) {

    const [displayStats, setDisplayStats] = useState(false)
    const { userId, username, email, isAuthenticated } = useContext(AuthContext);
    // const { search, setSearch } = useContext(QueryContext)
    const { query, changeQuery, emptyQuery } = useContext(QueryContext)
    const [showQuery, setShowQuery] = useState(!hideQuery)

    const changeHandler = (e) => {
        console.log(e.target.value);
        changeQuery(e.target.value);
        // setQuery(e.target.value);
    }

    const resetHandler = () => {
        emptyQuery();
    }

    const toggleDropDown = () => {
        setDisplayStats(o => !o);
    }

    const toggleSearch = () => {
        setShowQuery(!showQuery)
    }


    return (
        <div className="site-header">
            <Link className='title' to={'/'}><h1 className="logo">dishcovery</h1></Link>
            {/* {console.log(a)} */}
            {showQuery ?
                <form className="searchbar-wrapper">
                    <input type="text" name="Searchbar" id="search" value={query} onChange={(event) => changeHandler(event)} placeholder="🔎   Search recipes and chefs" />
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
                        <li><Link to={Path.Recipes}>Recipes</Link></li>
                        <li><Link to={Path.Authors}>Authors</Link></li>
                        {isAuthenticated && <li><Link to={Path.Chat}>Chat</Link></li>}
                    </ul>
                </nav>
            }
            {!hideQuery && <button className='toggle' onClick={toggleSearch}>{showQuery ? 'pages' : 'search'}</button>}
            {
                !isAuthenticated ? (
                    <div className="auth-buttons">
                        <p className='login'><Link to="/login">Log in</Link></p>
                        <p className='signup'><Link to="/signup">Sign up</Link></p>
                    </div>
                ) : (
                    <div onClick={toggleDropDown} className="profile">
                        <div className="subprofile">
                            <p className="name">{username}</p>
                            <nav>
                                <ul className={`dropdown ${displayStats == false ? 'hide' : 'show'}`}>
                                    <li><Link to={`${Path.Authors}/${userId}`}>Profile</Link></li>
                                    <li><Link to={Path.Logout}>Logout</Link></li>
                                    <li><Link to={Path.Settings}>Settings</Link></li>
                                    <li><button onClick={() => setDisplayStats(!displayStats)} type="button">Close</button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )
            }

        </div>
    )
}