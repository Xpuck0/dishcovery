import { Link } from 'react-router-dom';
import checkImageExists from '../utils/imageUtils';
import './CategoryCard.css';

export default function CategoryCard({
    image,
    category,
    count,
}) {
    const imgExists = image; 
    return (
        <li className="category-card-li-wrapper">
            <div className="category-card">
                <div className="img-container">
                    <img src={imgExists || image} alt="" />
                </div>
                <h3><Link to={`/tags/${category}`}>{category}</Link></h3>
                <p>{count} in this category</p>
            </div>
        </li>
    )
}