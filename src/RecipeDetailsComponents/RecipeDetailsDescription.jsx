import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";
import { updateRecipe } from "../services/recipesAPI";
import "./RecipeDetailsDescription.css";
import Heading from "../components/Heading";
import useBasicForm from "../hooks/useBasicForm"; // Assuming you have a useForm custom hook

export default function RecipeDetailsDescription({ recipe, setRecipe }) {
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { id } = useParams();
  const { values, handleChange, resetForm } = useBasicForm({ description: recipe.description });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const editDescriptionHandler = () => {
    setIsEditing(true);
  };

  const descriptionEditSubmit = async (e) => {
    e.preventDefault();
    const newDescription = values.description.trim();
    if (newDescription !== '') {
      const updatedRecipe = await updateRecipe(id, { ...recipe, description: newDescription }, true);
      setRecipe(updatedRecipe);
      setIsEditing(false);
      setError('');
    } else {
      setError('Description cannot be empty!');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    resetForm();
  };

  return (
    <>
      <div className="section-heading">
        <Heading content="Description" />
        {isAuthenticated && userId === recipe._ownerId && !isEditing && (
          <span className="edit-btn" onClick={editDescriptionHandler}>Edit</span>
        )}
      </div>
      {isEditing ? (
        <form className="edit-form description-edit" onSubmit={descriptionEditSubmit}>
          <div className="input">
            <textarea
              name="description"
              onChange={handleChange}
              value={values.description}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <p className="description">{recipe.description}</p>
      )}
    </>
  );
}