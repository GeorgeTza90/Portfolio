import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";
import CommentsCard from "./CommentsCard";
import styles from "./postCard.module.css";
import React, { useEffect, useState } from 'react';
import PostService from "../../services/PostService";
import DeleteService from "../../services/DeleteService";


function PostCard({ posts, comments, user, likes }) {
    const [postLikes, setPostLikes] = useState([]);
    const [commentLikes, setCommentLikes] = useState([]);
    const [postComments, setPostComments] = useState([]);
    const [commentVis, setCommentVis] = useState([]);
    const [liked, setLiked] = useState([]);
    const [likeCount, setLikeCount] = useState([]);
    const [commentCount, setCommentCount] = useState([]);
    const handleData = ({ id, counter }) => {
        setCommentCount(prevState => ({
            ...prevState,
            [id]: (prevState[id] || 0) + counter,
        }));
    };

    useEffect(() => {
        const count = {};

        posts.forEach((post) => {
            count[post.id] = 0;
        });

        posts.forEach((post) => {
            postComments.forEach(comment => {
                if (comment.kindID === post.id) {
                    count[comment.kindID] += 1;
                }
            });
        });

        setCommentCount(count);
    }, [postComments, posts]);

    useEffect(() => {
        const filteredLikesByPost = [];
        const filteredLikesByComment = [];

        likes.forEach((like) => {
            if (like.kind === "post") {
                filteredLikesByPost.push(like);
            } else if (like.kind === "comment") {
                filteredLikesByComment.push(like);
            }
        });

        setPostLikes(filteredLikesByPost);
        setCommentLikes(filteredLikesByComment);
    }, [likes]);

    useEffect(() => {
        const filteredCommentsByPost = [];
        const filteredCommentsByComment = [];

        comments.forEach((comment) => {
            if (comment.kind === "post") {
                filteredCommentsByPost.push(comment);
            } else if (comment.kind === "comment") {
                filteredCommentsByComment.push(comment)
            }
        });

        setPostComments(filteredCommentsByPost);
    }, [comments])

    useEffect(() => {
        let filteredLiked = [];
        let count = {};

        posts.forEach((post) => {
            count[post.id] = 0;
        });

        postLikes.forEach((like) => {
            if (count[like.kindID] === undefined) {
                count[like.kindID] = 0;
            }
            count[like.kindID] += 1;

            if (like.user === user) {
                filteredLiked.push({ id: like.kindID, liked: true, user: like.user });
            } else {
                filteredLiked.push({ id: like.kindID, liked: false, user: like.user });
            }
        });

        setLikeCount(count);
        setLiked(filteredLiked);
    }, [postLikes, user]);

    useEffect(() => {
        let vis = {};

        posts.forEach((post) => {
            vis[post.id] = false;
        });

        setCommentVis(vis)
    }, [comments]);

    const toggleCommentVis = (id) => {
        setCommentVis(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleLike = async (kind, id) => {
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
                        [id]: (prevState[id] || 0) - 1,
                    }));
                    setLiked(prev => prev.filter(like => like.id !== id || like.user !== user));
                }
            }

        } catch (err) {
            console.log(err.response, `Cannot like/unlike this ${kind}`);
        }
    };


    return (
        <div>
            {
                posts.length > 0 ? (
                    posts.map((post, index) => (

                        <div key={index} className={styles.card}>
                            <div className={styles.all}>
                                <label className={styles.label}>{post.label}</label><br />
                                <img src={post.imgLink} className={styles.image} alt="Post Image" />
                                <div className={styles.text} dangerouslySetInnerHTML={{ __html: post.text }} />

                                <div className={styles.interactionContainer}>
                                    <div className={styles.interaction}>
                                        <LikeButton slot={likeCount[post.id]} onClick={() => handleLike("post", post.id)} />
                                        <CommentButton slot={commentCount[post.id]} onClick={() => toggleCommentVis(post.id)} />
                                        <ShareButton slot="" />
                                    </div>
                                </div>
                            </div>
                            {commentVis[post.id] && <CommentsCard comments={postComments.filter(comment => comment.kindID === post.id)} likes={commentLikes} user={user} postID={post.id} sendData={handleData} />}
                        </div>

                    ))
                ) : (
                    <p>No posts yet.</p>
                )
            }
        </div >
    );
}

export default PostCard;
