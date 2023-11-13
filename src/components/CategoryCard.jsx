import './CategoryCard.css';

export default function CategoryCard(props) {
    return (
        <li className="category-card-li-wrapper">
            <div className="category-card">
                <div className="img-container">
                    <img src="/profile-pic.jpg" alt="" />
                </div>
                <h3>{props.name}</h3>
                <p>{props.count} in this category</p>
            </div>
        </li>
    )
}