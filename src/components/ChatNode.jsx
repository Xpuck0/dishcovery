import { Link } from "react-router-dom";
import convertTimestampToFormattedDate from "../utils/dateUtils";
import "./ChatNode.css";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/contexts";
import { updateChat, deleteChat } from "../services/chatAPI";

export default function ChatNode({ chat, deleteChatFunc }) {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [newContent, setNewContent] = useState(chat.content);
    const [error, setError] = useState(false)

    const enableEdit = (e) => {
        e.preventDefault();
        setEditing(true);
    }

    const changeEdit = (e) => {
        e.preventDefault();
        setNewContent(e.target.value);
    }

    const deleteChatHandler = async (e) => {
        if (confirm("Are you sure that you want to delete this message?")) {
            deleteChatFunc(chat._id)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (newContent.length) {
            const res = await updateChat(chat._id, { ...chat, content: newContent }, true);
            chat.content = newContent;
            setEditing(false);
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div className={`chat-node ${chat._ownerId == userId ? 'owner' : 'normal'}`}>
            <div className="img-section">
                <div className="img-container">
                    <img src={!!!chat.profilePicture?.length ? 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png' : chat.profilePicture} alt="" />

                </div>
            </div>
            <div className="text-section">
                <div className="heading">
                    <Link className="username" to={`/authors/${chat._ownerId}`}>{chat.username}</Link>
                    <p className="date">{convertTimestampToFormattedDate(chat._createdOn)}</p>
                    {isAuthenticated && userId == chat._ownerId && !editing && (
                        <div className="buttons">
                            <button className="edit-btn" type="button" onClick={enableEdit}>Edit</button>
                            <button className="delete-btn" type="button" onClick={deleteChatHandler}>Delete</button>
                        </div>
                    )}
                </div>
                <div className="main">
                    {!editing ? (
                        <p className="content">{chat.content}</p>
                    ) : (
                        <form onSubmit={onSubmit} className="edit-form">
                            <textarea defaultValue={chat.content} onChange={changeEdit}></textarea>
                            {error && <p className="error">Text should be at least a character long!</p>}
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}