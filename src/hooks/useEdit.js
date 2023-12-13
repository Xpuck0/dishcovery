import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

export default function useEditRecipe(onSubmit, initData, ownerId) {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [showItem, setShowItem] = useState(true);

    const [newData, setNewData] = useState(initData);

    const { id } = useParams();

    const changeHandler = (e) => {
        setNewData(e.target.value)
    }

    const editDataHandler = (e) => {
        setShowItem(false);
    }

    const dataEditSubmit = async (e) => {
        e.preventDefault();
        setShowItem(true);

        const res = await updateRecipe(id, { ...recipe, [initData]: newData }, true)
        setRecipe(res)
    }


    const returnValues = {
        newData: newData,
        isOwner: isAuthenticated && userId == ownerId,
        showItem: showItem,
        // setShowItem: setShowItem,
        changeHandler: changeHandler,
        editDataHandler: editDataHandler,
        dataEditSubmit: dataEditSubmit
    }

    return returnValues; 

}