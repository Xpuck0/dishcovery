import checkImageExists from '../utils/imageUtils';
import './CategoryCard.css';

export default function CategoryCard({
    image,
    category,
    count,
}) {
    const imgExists = checkImageExists(image, (exists) => exists ? true : false) 
    return (
        <li className="category-card-li-wrapper">
            <div className="category-card">
                <div className="img-container">
                    <img src={imgExists || image} alt="" />
                </div>
                <h3>{category}</h3>
                <p>{count} in this category</p>
            </div>
        </li>
    )
}