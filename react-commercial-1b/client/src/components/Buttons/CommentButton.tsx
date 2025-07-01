import { useState } from "react";
import type { MouseEventHandler } from "react"

interface CommentButtonProps {
  slot?: React.ReactNode;
  disabled?: boolean;
  size?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function CommentButton({ slot = "Click Me", disabled = false, size = 3.8, onClick }: CommentButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const styles: React.CSSProperties = {
    backgroundImage: isHovered ? "url(/assets/comment_hovered.png)" : "url(/assets/comment.png)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: `${size}ch`,
    padding: "20px",
    color: "aliceblue",
    fontWeight: "bold",
    fontSize: "larger",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
  };

  return (
    <button
      style={styles}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {slot}
    </button>
  );
}

export default CommentButton;
