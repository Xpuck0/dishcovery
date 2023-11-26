import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createComment, getAllComments } from "../services/commentsAPI";

import Heading from "../components/Heading";
import "./CommentSection.css"


const COMMENT_STATE_KEYS = {
    username: '',
    comment: ''
}

export default function CommentSection() {
    const [comment, setComment] = useState(COMMENT_STATE_KEYS)
    const [comments, setComments] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getAllComments(id)
            .then(data => {
                setComments(data)
            })
    }, [comment])

    const changeHandler = (e) => {
        setComment(old => ({
            ...old,
            [e.target.name]: e.target.value,
        }))
    }

    const clearState = () => {
        setComment(COMMENT_STATE_KEYS);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await createComment(id, comment.username, comment.comment);
        console.log('//TODO COMMENT by user')
        // createComment()
        setComments(old => [...old, res])
        clearState();
    }

    return (
        <>
            <Heading content={`Comments[${comments.length}]`}/>
            <article className="create-comment">
                <form className="form" onSubmit={submitHandler}>
                    {/* <input type="text" name="username" value={comment.username} onChange={changeHandler} /> */}
                    <h3 className="author"><Link to={`/authors/${id}`}></Link>{comment.username || "Xpuckosdfasdf"}</h3>
                    <textarea name="comment" id="comment" value={comment.comment} placeholder="Add comment..." cols="30" rows="10" onChange={changeHandler} ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </article>
            <div className="comments">
                <ul>
                    {comments.length > 0 ? comments.map((a) => (
                        <li key={a._id} >
                            <section className="recipe-comment">
                                <h4 className="heading"><Link to={`/authors/${a.owner}`}>{a.username}</Link></h4>
                                <p className="content">{a.comment}</p>
                            </section>
                        </li>
                    )) : <h3>No comments! Be the first one to post a comment!</h3>}
                </ul>
            </div>

        </>
    )
}