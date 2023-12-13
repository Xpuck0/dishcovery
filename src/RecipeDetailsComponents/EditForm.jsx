import { useState } from "react";
import { updateRecipe } from "../services/recipesAPI";
import { useParams } from "react-router-dom";

export default function EditForm({type, showEdit, setShowEdit, recipe, setRecipe, newArr, setNewArr }) {
    // const [newArr, setNewArr] = useState([]);
    const [prompt, setPrompt] = useState('');

    const {id} = useParams()

    const editCancel = (e) => {
        e.preventDefault();
        setPrompt('');
        setShowEdit(false)
    }

    const editRemove = async (i) => {
        const updatedArr = [...newArr];
        updatedArr.splice(i, 1);
        const res = await updateRecipe(id, { ...recipe, [type]: updatedArr}, true)
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
                const res = await updateRecipe(id, { ...recipe, [type]: updatedArr}, true);
                console.log(res)
                setRecipe(res);
            } catch (error) {
                console.error('Error updating recipe:', error);
            }

            setPrompt('');
        }
    }



    return (
        <div className={`edit ${!showEdit ? 'hide' : ''}`}>
            <ul>
                {newArr?.map((el, i) => (
                    <li key={`${el}${i}`}>{el} {recipe[type].length > 1 && <span onClick={() => editRemove(i)}>X</span>}</li>
                ))}
            </ul>
            <form onSubmit={editSubmit} className={`edit-form `}>
                <label htmlFor="prompt">New {type}</label>
                <textarea name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                <button type="submit">Add</button>
                <button type="button" onClick={editCancel}>Ok</button>
            </form>
        </div>
    )
}