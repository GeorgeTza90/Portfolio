import { useState, useEffect } from 'react';
import type {JSX } from "react";
import type { Comment, CommentsCardProps, Liked } from "../../types/types.ts";
import PostService from "../../services/PostService";
import DeleteService from "../../services/DeleteService";
import CommentItem from './CommentItem.tsx';
import CommentForm from '../Forms/CommentForm.tsx';
import styles from "./commentsCard.module.css";

const CommentsCard = ({ comments, likes, user, postID, sendData }: CommentsCardProps): JSX.Element => {
  const [errMsg, setErrMsg] = useState<string>("");
  const [liked, setLiked] = useState<Liked[]>([]);
  const [likeCount, setLikeCount] = useState<Record<number, number>>({});  
  const [commentsAll, setCommentsAll] = useState<Comment[]>(comments);

  useEffect(() => {
    const filteredLiked: { id: number; liked: boolean; user: string }[] = [];
    const count: Record<number, number> = {};

    comments.forEach((comment) => count[comment.id] = 0);

    likes.forEach((like) => {
      if (count[like.kindID] === undefined) count[like.kindID] = 0;
      count[like.kindID] += 1;
      filteredLiked.push({ id: like.kindID, liked: true, user: like.user });
    });

    setLikeCount(count);
    setLiked(filteredLiked);
  }, [likes, comments]);

  const handleLike = async (kind: string, id: number): Promise<void> => {
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
          await DeleteService.deleteLikeData(kind, Number(id), user);
          setLikeCount(prevState => ({
            ...prevState,
            [id]: Math.max((prevState[id] || 0) - 1, 0),
          }));

          setLiked(prev => prev.filter(like => like.id !== id || like.user !== user));
        }
      }
    } catch (err) {
      console.log(err, `Cannot like/unlike this ${kind}`);
    }
  };

  const handleCommentSubmit = async (text: string): Promise<void> => {    
    try {
      const response = await PostService.postCommentData(user, text, postID);
      const { commentID } = response;

      setCommentsAll(prevComments => [
        ...prevComments,
        { id: commentID, username: user, text: text, kind: "post", kindID: postID }
      ]);

      setLikeCount(prevState => ({
        ...prevState,
        [commentID]: 0,
      }));

      sendData({ id: postID, counter: 1 });
    } catch (error) {
      console.error("Failed to submit comment:", error);      
      throw error; 
    }
  };

  const handleCommentDelete = async (commentID: number): Promise<void> => {
    try {
      await DeleteService.deleteCommentData(commentID, user);
      setCommentsAll(commentsAll.filter(comment => comment.id !== commentID));
      sendData({ id: postID, counter: -1 });
    } catch (err) {
      console.error("Error deleting comment:", err);
      setErrMsg("Error deleting comment.");
    }
  };

  return (
    <div className={styles.all}>      
      <h1 className={styles.myH1}>Comments</h1>
      {commentsAll.length > 0 ? (
          commentsAll.map((comment) => (
            <CommentItem 
              comment={comment}
              currentUser={user}
              likeCount={likeCount[comment.id] || 0}
              onLike={handleLike}
              onDelete={handleCommentDelete}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )
      }
      {user !== "Guest" ? (
        <>
          <CommentForm onSubmit={handleCommentSubmit} />
          {errMsg && errMsg}
        </>        
      ) : (
        <a href="/login" className={styles.signInMsg}>Sign In now to write and like comments.</a>
      )}

    </div>
  );
}

export default CommentsCard;
