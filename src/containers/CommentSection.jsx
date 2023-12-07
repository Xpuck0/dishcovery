import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { createComment, deleteComment, getAllComments, updateComment } from "../services/commentsAPI";

import Heading from "../components/Heading";
import "./CommentSection.css"
import { AuthContext } from "../contexts/contexts";
import convertTimestampToFormattedDate from "../utils/dateUtils";



export default function CommentSection({ rating }) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);
    const [likedComments, setLikedComments] = useState([]);
    //     const storedLikedComments = localStorage.getItem('likedComments');
    //     return storedLikedComments ? JSON.parse(storedLikedComments) : [];
    // })
     const [editingCommentId, setEditingCommentId] = useState(null);
    const [error, setError] = useState('hidden');
    const { userId, username, isAuthenticated } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        getAllComments(id)
            .then(data => {
                setComments(data)
            })
    }, [id, username])

    const changeHandler = (e) => {
        setComment(old => e.target.value)
    }

    const clearState = () => {
        setComment('');
    }

    const commentLikeHandler = async (id, data) => {

        let updatedComments = comments.map(commentItem => {
            if (commentItem._id === id) {
                return {
                    ...commentItem,
                    likes: data.likes.includes(userId) ? data.likes.filter(el => el != userId) : [...data.likes, userId]
                };
            }
            return commentItem;
        });

        const newData = updatedComments.find(el => el._id == data._id);

        if (newData.likes.includes(userId)) {
            setLikedComments((prevLikedComments) => [...prevLikedComments, id]);
        } else {
            setLikedComments((prevLikedComments) =>
                prevLikedComments.filter((likedId) => likedId !== id)
            );
        }

        setComments(updatedComments);

        await updateComment(id, newData, true);

        // localStorage.setItem('likedComments', JSON.stringify(likedComments));

    }

    const commentDeleteHandler = async (id) => {
        await deleteComment(id);
        setComments(old => old.filter(a => a._id != id));
    }

    const commentEditHandler = async (id) => {

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (comment.length > 0) {
            const res = await createComment(id, username, comment, rating);
            setComments(old => [...old, res])
            clearState();
            setError('hidden')
        } else {
            setError('show');
        }
    }

    return (
        <>
            <Heading content={`Comments[${comments.length}]`} />
            {isAuthenticated ?
                <article className="create-comment">
                    <form className="form" onSubmit={submitHandler}>
                        {/* <input type="text" name="username" value={comment.username} onChange={changeHandler} /> */}
                        <h3 className="author"><Link to={`/authors/${id}`}>{username || "Anonymous"}</Link></h3>
                        <textarea name="comment" id="comment" value={comment} placeholder="Add comment..." cols="30" rows="10" onChange={changeHandler} ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <p className={error}>- Comment should be at least a character long!</p>
                </article> :
                <div className="create-comment">
                    <Link to="/login">Log in to comment</Link>
                </div>
            }

            <div className="comments">
                <ul>
                    {comments.length > 0 ? comments.map((a) => (
                        <li key={a._id} >
                            <section className="recipe-comment">
                                <div className="header">
                                    <h4 className="heading"><Link to={`/authors/${a._ownerId}`}>{a.username}</Link></h4>
                                    {a.rating != 0 && <p className="rating">{a.rating}/5 stars</p>}
                                    <p className="date">{convertTimestampToFormattedDate(a._createdOn)}</p>
                                    {isAuthenticated && <button onClick={() => commentLikeHandler(a._id, a)} className={`comment-like ${likedComments.includes(a._id) ? 'liked' : ''}`}>{a.likes.length} liked this</button>}
                                    {isAuthenticated && a._ownerId == userId && <p onClick={() => commentDeleteHandler(a._id)} className="removeBtn">X</p>}
                                    {isAuthenticated && a._ownerId == userId && <p onClick={() => commentEditHandler(a._id)} className="editBtn">E</p>}
                                </div>
                                <p className="content">{a.comment}</p>
                            </section>
                        </li>
                    )) : <h3>No comments! Be the first one to post a comment!</h3>}
                </ul>
            </div>

        </>
    )
}