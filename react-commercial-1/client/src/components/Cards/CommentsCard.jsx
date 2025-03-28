import styles from "./commentsCard.module.css";
import LikeButton from "../Buttons/LikeButton";
import React, { useState, useEffect } from 'react';
import Button1 from "../Buttons/Button1";
import PostService from "../../services/PostService";
import DeleteService from "../../services/DeleteService";


function CommentsCard({ comments, likes, user, postID, sendData }) {
    const [errMsg, setErrMsg] = useState("");
    const [liked, setLiked] = useState([]);
    const [likeCount, setLikeCount] = useState([]);
    const [newComment, setnewComment] = useState("");
    const [commentsAll, setCommentsAll] = useState(comments);


    useEffect(() => {
        let filteredLiked = [];
        let count = {};

        comments.forEach((comment) => {
            count[comment.id] = 0;
        });

        likes.forEach((like) => {
            if (count[like.kindID] === undefined) {
                count[like.kindID] = 0;
            }
            count[like.kindID] += 1;

            filteredLiked.push({ id: like.kindID, liked: true, user: like.user });
        });

        setLikeCount(count);
        setLiked(filteredLiked);
    }, [likes, user]);

    const handleLike = async (kind, id, sendData) => {
        try {
            if (user !== "Guest") {
                const existingLike = liked.find(like => like.user === user && like.id === id);

                if (!existingLike) {
                    await PostService.postLikeData(kind, id, user);
                    setLikeCount(prevState => ({
                        ...prevState,
                        [id]: (prevState[id] || 0) + 1,
                    }));

                    setLiked(prev => [...prev, { id: id, liked: true, user: user }]);
                } else {
                    await DeleteService.deleteLikeData(kind, id, user);
                    setLikeCount(prevState => ({
                        ...prevState,
                        [id]: Math.max((prevState[id] || 0) - 1, 0),
                    }));

                    setLiked(prev => prev.filter(like => like.id !== id || like.user !== user));
                }
            }
        } catch (err) {
            console.log(err.response, `Cannot like/unlike this ${kind}`);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await PostService.postCommentData(user, newComment, postID)
            const { commentID } = response.data;

            setCommentsAll(prevComments => [
                ...prevComments,
                { id: commentID, username: user, text: newComment, kind: "post", kindID: postID }
            ]);

            setLikeCount(prevState => ({
                ...prevState,
                [commentID]: 0,
            }));

            setnewComment("");
            sendData({ id: postID, counter: +1 });
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
    };

    const handleCommentDelete = async (commentID) => {
        try {
            await DeleteService.deleteCommentData(commentID, user)
            setCommentsAll(commentsAll.filter(comment => comment.id !== commentID));

            sendData({ id: postID, counter: -1 });
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };


    return (
        <div className={styles.all}>
            <h1 className={styles.myH1}>Comments</h1>
            {
                commentsAll.length > 0 ? (
                    commentsAll.map((comment, index) => (
                        <div key={index} id="commentSection" className={styles.commentSection}>
                            <label id="commentUser" className={styles.commentUser}>
                                {comment.username}
                            </label>
                            <div className={styles.commentContainer}>
                                <div id="commentText" className={styles.commentText}>
                                    {comment.text}
                                    {comment.username === user ? <button onClick={() => handleCommentDelete(comment.id)} className={styles.deleteButton} >X</button> : ""}
                                </div>

                                <div className={styles.interaction}>
                                    <LikeButton
                                        slot=""
                                        size="3.2"
                                        onClick={() => handleLike("comment", comment.id)}
                                    />
                                    {likeCount[comment.id]}

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            {user !== "Guest" ? (
                <div className={styles.commentSection}>
                    <div className={styles.commentContainer}>
                        <form onSubmit={handleCommentSubmit} type="POST">
                            <label className={styles.commentUser}>You</label>
                            <input
                                type="text"
                                id="newComment"
                                value={newComment}
                                onChange={(e) => setnewComment(e.target.value)}
                                required
                                className={styles.commentText2}
                                placeholder="Write a comment"
                            /><br />

                            <Button1 slot="submit" />
                            {errMsg && <p className={styles.error}>{errMsg}</p>}
                        </form>
                    </div>
                </div>
            ) : (
                <a href="/login" className={styles.signInMsg} >Sign In now to write and like comments.</a>
            )}

        </div>
    );
}

export default CommentsCard;
