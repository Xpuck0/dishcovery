import { useContext, useState } from "react"
import { AuthContext } from "../contexts/contexts"
import useForm from "../hooks/useForm";
import "./RecipeCreate.css";
import Heading from "../components/Heading.jsx"
import { createRecipe } from "../services/recipesAPI";

export default function RecipeCreate() {
    // const { credentials, onChange, onSubmit } = useForm()
    const [img, setImg] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [tag, setTag] = useState('')
    const [checked, setChecked] = useState(false)
    const [data, setData] = useState({
        title: '',
        description: '',
        images: [],
        ingredients: [],
        instructions: [],
        tags: []
    });

    const { username, wallets } = useContext(AuthContext);

    const submitForm = async () => {
        const res = await createRecipe(data);
        console.log(res);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        submitForm()
    };

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

    const tagsChangeHandler = (e) => {
        setTag(e.target.value);
    }

    const addTag = (e) => {
        const ingr = data.tags;
        ingr.push(tag)

        setTag('');
        setData(old => ({
            ...old,
            tags: ingr
        }))
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

    const removeHandler = (index, type) => {

        const updatedData = { ...data };
        if (type == "ingredients") {
            updatedData.ingredients.splice(index, 1);
        } else if (type == "instructions") {
            updatedData.instructions.splice(index, 1);
        } else if (type == "images") {
            updatedData.images.splice(index, 1);
        } else if (type == "tags") {
            updatedData.tags.splice(index, 1);
        }
        setData(updatedData);
    }


    return (
        <div className="create-page-wrapper">
            <div className="create-page">
                <form onSubmit={onSubmit}>
                    <section className="heading-wr">
                        <input className="title" placeholder="Enter title..." type="text" name="title" value={data.title} onChange={changeHandler} />
                        <p className="username">{username}</p>
                    </section>
                    <Heading content="Description" line={true} />
                    <div className="description">
                        <label htmlFor="description"></label>
                        <textarea placeholder="Write a brief description..." name="description" id="description" value={Object.description} onChange={changeHandler}></textarea>
                    </div>

                    <Heading content="Images" line={true} />
                    <div className="images-wr">
                        {data.images.length > 0 &&
                            <div className="added-images">
                                <ul>
                                    {data.images.map((img, i) => (
                                        <li key={i}>
                                            {img}
                                            <span onClick={() => removeHandler(i, "images")}>X</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <div className="img input-container">
                            <label htmlFor="img">Image url</label>
                            <textarea type="text" id="img" name="img" value={img} onChange={imageChangeHandler} />
                            <button type="button" onClick={addImage}>Add more</button>
                        </div>
                    </div>

                    <Heading content="Ingredients" line={true} />
                    <div className="ingredients-wr">
                        {data.ingredients.length > 0 &&

                            <div className="written-ingredients">
                                <ul>
                                    {data.ingredients.map((el, i) => (
                                        <li key={i}>
                                            {el}
                                            <span onClick={() => removeHandler(i, "ingredients")}>X</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <div className="ingredients input-container">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea type="textfield" name="ingredients" value={ingredients} onChange={ingredientsChangeHandler} />
                            <button type="button" onClick={addIngredient} >Add more</button>
                        </div>
                    </div>
                    <Heading content="Instructions" line={true} />
                    <div className="instructions">
                        {data.instructions.length > 0 &&
                            <div className="written-instructions">
                                <ol>
                                    {data.instructions && data.instructions.map((el, i) => (
                                        <li key={i}>
                                            {el}
                                            <span onClick={() => removeHandler(i, "instructions")}>X</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        }
                        <div className="instructions input-container">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea type="textfield" name="instructions" value={instructions} onChange={instructionsChangeHandler} />
                            <button type="button" onClick={addInstruction}>Add more</button>
                        </div>
                    </div>
                    <Heading content="Tags" line={true} />
                    <div className="tags">
                        {data.tags.length > 0 &&
                            <div className="written-tags">
                                <ol>
                                    {data.tags.map((el, i) => (
                                        <li key={i}>
                                            {el}
                                            <span onClick={() => removeHandler(i, "tags")}>X</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        }
                        <div className="tags input-container">
                            <label htmlFor="tags">Tags</label>
                            <textarea type="textfield" name="tags" value={tag} onChange={tagsChangeHandler} />
                            <button type="button" onClick={addTag}>Add more</button>
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div >
    )
}