import { useState } from "react";
import { updateRecipe } from "../services/recipesAPI";
import { useParams } from "react-router-dom";
import "./EditForm.css"

export default function EditForm({ type, showEdit, setShowEdit, recipe, setRecipe, newArr, setNewArr }) {
    // const [newArr, setNewArr] = useState([]);
    const [prompt, setPrompt] = useState('');

    const { id } = useParams()

    const editCancel = (e) => {
        e.preventDefault();
        setPrompt('');
        setShowEdit(false)
    }

    const editRemove = async (i) => {
        const updatedArr = [...newArr];
        updatedArr.splice(i, 1);
        const res = await updateRecipe(id, { ...recipe, [type]: updatedArr }, true)
        setRecipe(res)
        setNewArr(updatedArr);
    };

    const editSubmit = async (e) => {
        e.preventDefault();
        // setShowEdit(false);

        if (prompt !== '') {
            const updatedArr = [...newArr, prompt];

            setNewArr(updatedArr);

            try {
                const res = await updateRecipe(id, { ...recipe, [type]: updatedArr }, true);
                console.log(res)
                setRecipe(res);
            } catch (error) {
                console.error('Error updating recipe:', error);
            }

            setPrompt('');
        }
    }

    const checkRemove = () => {
        if (type == "tags" || type == "images" || recipe[type].length > 1) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <div className={`edit ${!showEdit ? 'hide' : ''}`}>
            <ul className="edit-arr">
                {newArr?.map((el, i) => (
                    <li key={`${el}${i}`}>{el} {checkRemove() && <span onClick={() => editRemove(i)}> X </span>}</li>
                ))}
            </ul>
            <form onSubmit={editSubmit} className={`edit-recipe-form`}>
                <div className="input">
                    <label htmlFor="prompt">New {type}</label>
                    <textarea name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                </div>
                <div className="buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={editCancel}>Ok</button>
                </div>
            </form>
        </div>
    )
}