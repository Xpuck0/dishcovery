import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/contexts"
import { createChat, deleteChat, getAllChats } from "../services/chatAPI";
import { getUserByCollectionId } from "../services/usersAPI";
import Header from "../Main-containers/Header";
import Heading from "../components/Heading";
import sortCallback from "../utils/sortCallback";
import ChatNode from "../components/ChatNode";
import "./ChatPage.css";


export default function ChatPage() {

    const [chat, setChat] = useState([])
    const { isAuthenticated, userId, username, profilePicture } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const [err, setErr] = useState(false);
    const [buttonContent, setButtonContent] = useState('Submit');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getAllChats();

                const updatedChats = await Promise.all(
                    res.map(async (chat) => {
                        const user = await getUserByCollectionId(chat._ownerId);
                        return {
                            ...chat,
                            username: user.username,
                            profilePicture: user.profilePicture,
                        };
                    })
                );

                setChat(updatedChats);
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        };

        getData();


        const pollingInterval = 5000;

        const intervalId = setInterval(getData, pollingInterval);

        return () => clearInterval(intervalId);
    }, [userId]);

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const deleteChatFunc = async (id) => {
        await deleteChat(id)
        const indexToDelete = chat.findIndex((e) => e._id === id);

        if (indexToDelete !== -1) {
            const updatedChats = [...chat.slice(0, indexToDelete), ...chat.slice(indexToDelete + 1)];
            setChat(updatedChats);
        }
    }

    const submitInput = async (e) => {
        e.preventDefault();
        if (input.length) {
            try {
                setButtonContent('Sent');
                const newChat = await createChat(userId, input);
                setChat((prevChats) => [...prevChats, newChat]);
                setInput('');
                setErr(false);

                setTimeout(() => {
                    setButtonContent('Submit');
                }, 1000);
            } catch (error) {
                console.error("Error creating chat:", error);
            }
        } else {
            setErr(true);
        }

    }

    return (
        <>
            <Header hideQuery={true} />
            <div className="chat-page">
                <Heading content="Chat Page" />
                <ul className="chat">
                    {chat.length ? chat.sort((a, b) => sortCallback(a, b, "date-descending")).map(r => (
                        <li key={r._id}><ChatNode chat={r} deleteChatFunc={deleteChatFunc} /></li>
                    )) : (<li>Chat is empty</li>)}
                </ul>
                <div className="input">
                    <h3><Link to={`/authors/${userId}`}>{username}</Link></h3>
                    <form onSubmit={submitInput}>
                        <div className="textarea-wrapper">
                            <textarea value={input} onChange={onInputChange} placeholder="Make a chat..." />
                            {err && <p className="error">Cannot send empty message!</p>}
                        </div>
                        <button className={buttonContent.toLowerCase()} type="submit">{buttonContent}</button>
                    </form>
                </div>
            </div>
        </>
    )
}