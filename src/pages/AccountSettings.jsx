import { useEffect, useState, useContext } from "react";

import Heading from "../components/Heading";
import "./AccountSettings.css"
import { AuthContext } from "../contexts/contexts";
import { getUser, getUserByCollectionId, updateUser} from "../services/usersAPI";
import { useNavigate } from "react-router-dom";
import Path from "../paths";

const CREDENTIALS_KEYS = {
    username: '',
    password: '',
    email: '',
    profilePicture: '',
    wallets: {
        bitcoin: '',
        monero: '',
    }
}

export default function AccountSettings() {
    const { userId, username, email,  } = useContext(AuthContext);
    const [jsonstoreUser, setJsonstoreUser] = useState({});
    const [newCredentials, setNewCredentials] = useState(CREDENTIALS_KEYS)
    const [showNewImagePrompt, setShowNewImagePrompt] = useState(false);
    const [buttonText, setButtonText] = useState("New Image");
    const [newImageUrl, setNewImageUrl] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        async function fetchUser(id) {
            const user = await getUserByCollectionId(id);
            console.log(user)
            setJsonstoreUser(user);
        }
        fetchUser(userId);
    }, [])

    const newImageClicked = (e) => {
        e.preventDefault();
        setShowNewImagePrompt(old => !old);
        setButtonText(old => old == "New Image" ? "Cancel" : "New Image");
    }



    const hideNewImagePrompt = (e) => {
        e.preventDefault();
        setShowNewImagePrompt(false);
        setNewCredentials(old => ({
            ...old,
            profilePicture: newImageUrl
        }))
        setNewImageUrl('');
        setButtonText(old => old == "New Image" ? "Cancel" : "New Image");
    }

    const credentialsChangeHandler = (e) => {
        setNewCredentials(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
        console.log(newCredentials)
    }

    const changeWallets = (e) => {

        setNewCredentials(old => ({
            ...old,
            wallets: {
                ...old.wallets,
                [e.target.name]: e.target.value
            }
        }));

        console.log(newCredentials);
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        nav(Path.Home)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // const res = await updateUser(jsonstoreUser._id, jsonstoreUser, newCredentials.wallets);
        console.log(newCredentials.wallets)
        // console.log(newCredentials);
    }

    return (
        <div className="account-settings">
            <form onSubmit={submitHandler} className="settings-form">
                <Heading content={"Profile Picture"} />
                {newCredentials.profilePicture && <div className="img-wrapper">
                    <img src={newCredentials.profilePicture} alt="" />
                </div>}
                <button className="new-image" onClick={newImageClicked}>{buttonText}</button>
                <div className={`new-image-prompt ${showNewImagePrompt ? 'show' : 'hide'}`}>
                    <label htmlFor="url">New Image: </label>
                    <input className="img-input" type="text" name="url" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
                    <button className="img-submit" type="button" onClick={hideNewImagePrompt}>Submit</button>
                </div>
                <div className="line" />
                <Heading content={"Authentication"} />
                <label className="username" htmlFor="username">{username}</label>
                <input type="text" name="username" value={newCredentials.username} onChange={credentialsChangeHandler} />
                <div className="line" />
                <p className="email">Email: <span>{email}</span></p>
                <label htmlFor="email">Change email:</label>
                <input type="email" name="email" value={newCredentials.email} onChange={credentialsChangeHandler} />
                <label htmlFor="password">Change password</label>
                <input type="password" name="password" value={newCredentials.password} onChange={credentialsChangeHandler} />
                <Heading content="Wallets" />
                <div className="wallets">

                    <label htmlFor="bitcoin">Bitcoin:</label>
                    <input name="bitcoin" type="text" value={newCredentials.wallets.bitcoin} onChange={changeWallets} />
                    <label htmlFor="monero">Monero:</label>
                    <input name="monero" type="text" value={newCredentials.wallets.monero} onChange={changeWallets} />
                </div>
                <div className="buttons">
                    <button onClick={cancelHandler} className="cancel">Cancel</button>
                    <button className="submit-form">Submit</button>
                </div>
            </form>
        </div>
    )
}