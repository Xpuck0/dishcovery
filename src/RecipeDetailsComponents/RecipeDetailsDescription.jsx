import Heading from "../components/Heading"

export default function RecipeDetailsDescription({ children, setRecipe }) {

    

    return (
        <>
            <Heading content="Description" />
            <p className="description">{children}</p>
        </>
    )
}