import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { createComment, deleteComment, getAllComments, updateComment, updateCommentPartially } from "../services/commentsAPI";

import Heading from "../components/Heading";
import "./CommentSection.css"
import { AuthContext } from "../contexts/contexts";
import convertTimestampToFormattedDate from "../utils/dateUtils";



export default function CommentSection({ rating }) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);
    const [likedComments, setLikedComments] = useState([]);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [error, setError] = useState('hidden');
    const { userId, username, isAuthenticated } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        getAllComments(id)
            .then(data => {
                setComments(data)
                setLikedComments(() => {
                    const l = [];
                    data.map(a => {
                        a.likes.includes(userId) && l.push(a._id)
                    })
                    return l
                })
            })
    }, [id, username])

    const changeHandler = (e) => {
        setComment(e.target.value)
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
    }

    const commentDeleteHandler = async (id) => {
        await deleteComment(id);
        setComments(old => old.filter(a => a._id != id));
    }

    const commentChangeHandler = (e) => {
        setEditCommentContent(e.target.value);
    }

    const clickCommentEditHandler = (id, comment) => {
        setEditCommentContent(comment)
        setEditingCommentId(id)
    }

    const editCommentSubmitHandler = async (e, id) => {
        e.preventDefault();

        const comment = comments.find(c => c._id == id);
        comment.comment = editCommentContent;

        const res = await updateComment(id, comment, true)

        setEditCommentContent('');
        setEditingCommentId(null);
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
                                    {isAuthenticated && <button onClick={() => commentLikeHandler(a._id, a)} className={`comment-like ${likedComments.includes(a._id) ? 'liked' : ''}`}>{a.likes.length} {a.likes.length === 1 ? 'like' : 'likes'}</button>}
                                    {isAuthenticated && a._ownerId == userId && (
                                        <div className="header-buttons">
                                            <p onClick={() => commentDeleteHandler(a._id)} className="removeBtn">Delete</p>
                                            <p onClick={() => clickCommentEditHandler(a._id, a.comment)} className="editBtn">Edit</p>
                                        </div>)
                                    }
                                </div>
                                {editingCommentId === a._id ?
                                    <form onSubmit={(e) => editCommentSubmitHandler(e, a._id)} className={'edit-form'}>
                                        <textarea defaultValue={a.comment} onChange={commentChangeHandler}></textarea>
                                        <div className="buttons">
                                            <button className="confirmBtn" type="submit">Confirm</button>
                                            <button className="cancelBtn" onClick={() => { setEditingCommentId('') }} type="button">Cancel</button>
                                        </div>
                                    </form>
                                    : <p className="content">{a.comment}</p>
                                }
                            </section>
                        </li>
                    )) : <h3>No comments! Be the first one to post a comment!</h3>}
                </ul>
            </div>

        </>
    )
}