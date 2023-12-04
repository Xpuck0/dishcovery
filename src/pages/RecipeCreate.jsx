import { useContext, useState } from "react"
import { AuthContext } from "../contexts/contexts"
import useForm from "../hooks/useForm";
import "./RecipeCreate.css";

export default function RecipeCreate() {
    // const { credentials, onChange, onSubmit } = useForm()
    const [img, setImg] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [data, setData] = useState({
        title: '',
        images: [],
        ingredients: [],
        instructions: [],
    });

    const { username, wallets } = useContext(AuthContext);

    const submitHandler = async (e) => {
        const res = await fetch('https://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
    }

    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const addImage = (e) => {
        const images = data.images;
        images.push(img);

        setImg('');
        setData(old => ({
            ...old,
            images: images,
        }))
    }

    const imageChangeHandler = (e) => {
        setImg(e.target.value)
    }
    
    const ingredientsChangeHandler = (e) => {
        setIngredients(e.target.value)
    }

    const addIngredient = (e) => {
        const ingr = data.ingredients;
        ingr.push(ingredients)

        setIngredients('');
        setData(old => ({
            ...old,
            ingredients: ingr
        }))
    }

    const instructionsChangeHandler = (e) => {
        setInstructions(e.target.value);
    }

    const addInstruction = (e) => {
        const instr = data.instructions;
        instr.push(instructions);

        setInstructions('')
        setData(old => ({
            ...old,
            instructions: instr
        }))
    }

    return (
        <div className="create-page-wrapper">
            <div className="create-page">
                <section className="heading-wr">
                    <label htmlFor="title">Title</label>
                    <input className="title" type="text" name="title" value={data.title} onChange={changeHandler}/>
                    <p className="username">{username}</p>
                </section>
                <div className="images-wr">
                    <div className="img-input-container">
                        <label htmlFor="img">Image url</label>
                        <input type="text" id="img" name="img" value={img} onChange={imageChangeHandler}/>
                        <button onClick={addImage}>Add more</button>
                    </div>
                </div>
                <div className="ingredients-wr">
                    <div className="ingredients-input-container">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea type="textfield" name="ingredients" value={ingredients} onChange={ingredientsChangeHandler} />
                        <button onClick={addIngredient} >Add more</button>
                    </div>
                </div>
                <div className="instructions">
                    <div className="instructions-input-container">
                        <label htmlFor="instructions">Instructions</label>
                        <textarea type="textfield" name="instructions" value={instructions} onChange={instructionsChangeHandler} />
                        <button onClick={addInstruction}>Add more</button>
                    </div>
                </div>
            </div>
        </div>
    )
}