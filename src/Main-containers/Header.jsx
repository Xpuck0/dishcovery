import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {

    return (
        <div className="site-header">
            <h1 className="logo">dishcovery</h1>
            <form>
                <input type="text" name="Searchbar" placeholder="Search recipes and chefs"/>
            </form>
            <div className="auth-buttons">
                <p><Link to="/login">Log in</Link></p>
                <p><Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}