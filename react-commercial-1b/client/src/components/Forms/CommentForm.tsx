import { useState } from "react";
import type { ChangeEvent } from "react";
import type { CommentFormProps } from "../../types/types";
import Button1 from "../Buttons/Button1";
import styles from "./commentForm.module.css";

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setErrMsg("");
      await onSubmit(newComment);
      setNewComment("");
    } catch (error) {
      setErrMsg("Failed to submit comment.");
    }
  };

  return (
    <div className={styles.commentSection}>
      <div className={styles.commentContainer}>
        <form onSubmit={handleSubmit}>
          <label className={styles.commentUser}>You</label>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className={styles.commentText2}
            placeholder="Write a comment"
          />
          <br /><br />
          <Button1 slot="submit" />
          {errMsg && <p className={styles.error}>{errMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
