import { Link } from 'react-router-dom';
import './Header.css';
import { createContext, useContext, useEffect, useState } from 'react';


export default function Header({ setSearch, search }) {

    const changeHandler = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="site-header">
            <Link to={'/'}><h1 className="logo">dishcovery</h1></Link>
            <form className="searchbar-wrapper">
                <input type="text" name="Searchbar" id="search" value={search} onChange={changeHandler} placeholder="Search recipes and chefs" />
                    <svg
                        onClick={() => setSearch('')} 
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
            <div className="auth-buttons">
                <p className='login'><Link to="/login">Log in</Link></p>
                <p className='signup'><Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}