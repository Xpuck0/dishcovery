import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <h2>About</h2>
            <p>A website where you can read, post, like and comment on recipes.</p>
            <div className="line"></div>
            <p className="button"><a href="#">Back to top</a></p>
            <Link to="/">Home</Link>
        </footer>
    )
}