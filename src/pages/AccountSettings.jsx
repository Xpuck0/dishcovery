import { useEffect, useState, useContext } from "react";

import Heading from "../components/Heading";
import "./AccountSettings.css"
import { AuthContext } from "../contexts/contexts";
import { getUser, getUserByCollectionId, updateUser } from "../services/usersAPI";
import { useNavigate } from "react-router-dom";
import Path from "../paths";
import Header from "../Main-containers/Header";
import usePersistedState from "../hooks/usePersistedState";

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
    const { userId, username, email, isAuthenticated } = useContext(AuthContext);
    const [jsonstoreUser, setJsonstoreUser] = useState({});
    const [newCredentials, setNewCredentials] = useState(CREDENTIALS_KEYS)
    const [showNewImagePrompt, setShowNewImagePrompt] = useState(false);
    const [buttonText, setButtonText] = useState("New Image");
    const [newImageUrl, setNewImageUrl] = useState('');
    const [loading, setLoading] = useState(true)
    const [persistedState, setPersistedState] = usePersistedState('auth')
    const nav = useNavigate();

    const hasWallets = Object.values(newCredentials.wallets).some(value => value.trim() !== '');

    useEffect(() => {
        async function fetchUser(id) {
            let user;
            try {
                setLoading(true);
                user = await getUserByCollectionId(id);
            } catch (err) {
                console.log(err)
                nav(Path.Home)
            } finally {
                setLoading(false);
                setJsonstoreUser(user);
            }
        }
        fetchUser(userId);
    }, [userId])

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

    const setNewImage = (e) => setNewImageUrl(e.target.value);

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
        console.log(newCredentials);

        const updatedUser = {
            ...jsonstoreUser,
            username: newCredentials.username || jsonstoreUser.username,
            profilePicture: newCredentials.profilePicture || jsonstoreUser.profilePicture,
            wallets: hasWallets ? newCredentials.wallets : jsonstoreUser.wallets, 
        };

        try {
            const res = await updateUser(userId, updatedUser);
            setJsonstoreUser(res);
            setPersistedState(() => ({ ...persistedState, username: res.username, wallets: res.wallets }));
            console.log(res);
        } catch (err) {
            console.log(err); 
        }
    };

    if (loading) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            <Header hideQuery={true} />
            <div className="account-settings">
                <form onSubmit={submitHandler} className="settings-form">
                    <Heading content={"Profile Picture"} />
                    {newCredentials.profilePicture && <div className="img-wrapper">
                        <img src={newCredentials.profilePicture} alt="" />
                    </div>}
                    <button className="new-image" onClick={newImageClicked}>{buttonText}</button>
                    <div className={`new-image-prompt ${showNewImagePrompt ? 'show' : 'hide'}`}>
                        <label htmlFor="url">New Image: </label>
                        <input className="img-input" type="text" name="url" value={newImageUrl} onChange={setNewImage} />
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
        </>
    )
}