import { useState, useEffect } from "react";
import { getAllCategories } from "../services/categoryAPI";
import CategoryCard from "../components/CategoryCard";
import './Categories.css';

const base = {
    "pizza": 0,
    "salad": 0,
    "soup": 0,
    "pasta": 0,
    "meats": 0,
    "shakes": 0,
}

export default function Categories() {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        async function fetchData() {
            const data = await getAllCategories();
            setCategories(() => data)
        }         

        fetchData();
        // console.log(categories)
    }, [])

    return (
        <div className="categories">
            <h3>Categories</h3>
            <ul>
                {
                    Object.entries(categories).map(([key, value]) => (
                        // console.log(key, value)
                        <CategoryCard key={key} {...value} />
                    ))
                }
            </ul>
        </div>
    )
}