import { useEffect, useState } from "react"
import { addComment, getComments } from "../api/commentsAPI"
import { timeAgo } from "../utils/timeago"

const CommentsSection = ({id}) => {
    const [comments, setComments] = useState()
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)

    const [newComment, setNewComment] = useState("")
    const [newCommentError, setNewCommentError] = useState(null)

    // Get All Comments
    const getAllComments = async(leadID) => {
        try {
            const res = await getComments(leadID)
            setComments(res.data)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getAllComments(id)
    }, [loading])

    // Add a new comment
    const handleCommentSubmit = async() => {
        try {
            const commentData = {
                commentText: newComment,
                author: '67fd0d5be4d62a8394a021c4'
            }

            const response = await addComment(id, commentData)
            if(response.status === 201) {
                setLoading(true)
                setError(null)
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                setNewComment('')
            }

        } catch (error) {
            setNewCommentError(error.response.data.error)
        }
    }

    return (
        <>
            <h3>Comments</h3>
            <div className="new-comment">
                <textarea onChange={(e) => setNewComment(e.target.value)} value={newComment} name="" id="comment-textarea" rows={5} ></textarea>
                {newCommentError && <p>{newCommentError}</p>}
                <button onClick={() => handleCommentSubmit()} className="addButton">Submit</button>
            </div>
            <div>
                {comments && 
                    <ul className="comment-list">
                        {comments.map(comment => (
                            <li key={comment._id}>
                                <h4>{comment.author.name} <span className="time-ago">{timeAgo(comment.createdAt)}</span></h4>
                                <p>{comment.commentText}</p>
                            </li>   
                        ))}
                    </ul>

                }
                {error && 
                    <div>
                        <p style={{color: "grey", fontStyle: "italic", paddingTop: '1rem'}}>Nothing logged here yet. Add a quick update?</p>

                    </div>
                }
            </div>
        </>

    )
}

export default CommentsSection