import styles from "./commentsCard.module.css";
import LikeButton from "../Buttons/LikeButton.tsx";
import { useState, useEffect } from 'react';
import type {JSX, FormEvent} from "react";
import Button1 from "../Buttons/Button1";
import PostService from "../../services/PostService";
import DeleteService from "../../services/DeleteService";

interface Comment {
  id: number;
  username: string;
  text: string;
  kind: string;
  kindID: number;
}

interface Like {
  id: number;
  kind: "post" | "comment";
  kindID: number;
  user: string;
}

interface CommentsCardProps {
  comments: Comment[];
  likes: Like[];
  user: string;
  postID: number;
  sendData: (data: { id: number; counter: number }) => void;
}

function CommentsCard({ comments, likes, user, postID, sendData }: CommentsCardProps): JSX.Element {
  const [errMsg, setErrMsg] = useState<string>("");
  const [liked, setLiked] = useState<{ id: number; liked: boolean; user: string }[]>([]);
  const [likeCount, setLikeCount] = useState<Record<number, number>>({});
  const [newComment, setNewComment] = useState<string>("");
  const [commentsAll, setCommentsAll] = useState<Comment[]>(comments);

  useEffect(() => {
    const filteredLiked: { id: number; liked: boolean; user: string }[] = [];
    const count: Record<number, number> = {};

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
          await DeleteService.deleteLikeData(kind, id, user);
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

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await PostService.postCommentData(user, newComment, postID);
      const { commentID } = response.data;

      setCommentsAll(prevComments => [
        ...prevComments,
        { id: commentID, username: user, text: newComment, kind: "post", kindID: postID }
      ]);

      setLikeCount(prevState => ({
        ...prevState,
        [commentID]: 0,
      }));

      setNewComment("");
      sendData({ id: postID, counter: +1 });
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setErrMsg("Failed to submit comment.");
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
      {
        commentsAll.length > 0 ? (
          commentsAll.map((comment) => (
            <div key={comment.id} id="commentSection" className={styles.commentSection}>
              <label id="commentUser" className={styles.commentUser}>
                {comment.username}
              </label>
              <div className={styles.commentContainer}>
                <div id="commentText" className={styles.commentText}>
                  {comment.text}
                  {comment.username === user && (
                    <button
                      onClick={() => handleCommentDelete(comment.id)}
                      className={styles.deleteButton}
                      aria-label="Delete comment"
                    >
                      X
                    </button>
                  )}
                </div>

                <div className={styles.interaction}>
                  <LikeButton
                    slot=""
                    size={3.2}
                    onClick={() => handleLike("comment", comment.id)}
                  />
                  {likeCount[comment.id] || 0}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )
      }
      {user !== "Guest" ? (
        <div className={styles.commentSection}>
          <div className={styles.commentContainer}>
            <form onSubmit={handleCommentSubmit} method="POST">
              <label className={styles.commentUser}>You</label>
              <input
                type="text"
                id="newComment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
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
        <a href="/login" className={styles.signInMsg}>Sign In now to write and like comments.</a>
      )}

    </div>
  );
}

export default CommentsCard;
