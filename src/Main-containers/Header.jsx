import './Header.css'

export default function Header() {

    return (
        <div className="site-header">
            <h1 className="logo">dishcovery</h1>
            <form>
                <input type="text" name="Searchbar" placeholder="Search recipes and chefs"/>
            </form>
            <div className="auth-buttons">
                <p><a href="#">Log in</a></p>
                <p><a href="#">Sign up</a></p>
            </div>
        </div>
    )
}