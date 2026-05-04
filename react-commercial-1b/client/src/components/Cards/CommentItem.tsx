import type { CommentItemProps } from "../../types/types";
import LikeButton from "../Buttons/LikeButton";
import styles from "./commentsCard.module.css";

const CommentItem = ({ comment, currentUser, likeCount, onLike, onDelete }: CommentItemProps) => {
    return(
        <div key={comment.id} id="commentSection" className={styles.commentSection}>
              <label id="commentUser" className={styles.commentUser}>
                {comment.username}
              </label>
              <div className={styles.commentContainer}>
                <div id="commentText" className={styles.commentText}>
                  {comment.text}
                  {comment.username === currentUser && (
                    <button
                      onClick={() => onDelete(comment.id)}
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
                    onClick={() => onLike("comment", comment.id)}
                  />
                  {likeCount}
                </div>
              </div>
            </div>
    )
}

export default CommentItem;