import CategoryCard from "../components/CategoryCard";
import './Categories.css';

export default function Categories() {
    const name = "Sample";
    const count = 63;

    return (
        <div className="categories">
            <h3>Categories</h3>
            <ul>
                <CategoryCard name={name} count={count}  />
                <CategoryCard name={name} count={count}  />
                <CategoryCard name={name} count={count}  />
                <CategoryCard name={name} count={count}  />
                <CategoryCard name={name} count={count}  />
                <CategoryCard name={name} count={count}  />
            </ul>
        </div>
    )
}